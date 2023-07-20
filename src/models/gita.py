from __future__ import annotations

import json
import typing

import asyncpg
import attrs
import pydantic

from src.exceptions import ShlokaNotFound
from src.utils import AttrsClassToPayload


def _open_and_fill(adhyaya: int) -> typing.Dict[str, ShlokaDict]:
    with open(f"bin/gita/adhyaya{adhyaya}.json", encoding="utf8") as file:
        return json.load(file)


class GitaQuery(pydantic.BaseModel):
    adhyaya: int
    shlokas: list[int] = []
    start: int | None = None
    end: int | None = None


class ShlokaDict(typing.TypedDict):
    adhyaya: int
    shloka: int
    speaker: str
    original: str
    romanised: str
    english: str
    hindi: str


@attrs.define(kw_only=True)
class GitaShloka(AttrsClassToPayload):
    adhyaya: int
    shloka: int
    speaker: str
    original: str
    romanised: str
    english: str
    hindi: str

    _cache: typing.Dict[int, typing.Dict[str, ShlokaDict]] = {}

    @classmethod
    def _attempt_local(cls, adhyaya: int, shloka: int) -> ShlokaDict | None:
        return cls._cache[adhyaya].get(str(shloka))

    @classmethod
    async def fetch(cls, dbdriver: asyncpg.Pool[asyncpg.Record], adhyaya: int, shloka: int) -> ShlokaDict:
        data = await dbdriver.fetchrow("SELECT * FROM bhagavadgita WHERE adhyaya = $1 AND shloka = $2", adhyaya, shloka)
        if not data:
            raise ShlokaNotFound(f"adhyaya {adhyaya} with shloka {shloka} not found.")
        cls._cache[adhyaya][str(shloka)] = ShlokaDict(**data)
        return data  # type: ignore

    @classmethod
    async def new(cls, dbdriver: asyncpg.Pool[asyncpg.Record], adhyaya: int, shloka: int) -> GitaShloka:
        base = {
            "adhyaya": adhyaya,
            "shloka": shloka,
            "speaker": "unavailable",
            "original": "not added yet",
            "romanised": "not added yet",
            "hindi": "not added yet",
            "english": "not added yet",
        }
        shloka_dict = cls._attempt_local(adhyaya, shloka) or await cls.fetch(dbdriver, adhyaya, shloka)
        base.update(shloka_dict)
        return GitaShloka(**base)


GitaShloka._cache = {num: _open_and_fill(num) for num in range(1, 19)}


@attrs.define(kw_only=True)
class GitaQueryResponse(AttrsClassToPayload):
    adhyaya: int
    range: typing.Tuple[int, int] | None = None
    shlokas: typing.Tuple[int, ...] | None = None
    responses: typing.List[ShlokaDict] = []

    @classmethod
    async def new(
        cls,
        dbdriver: asyncpg.Pool[asyncpg.Record],
        adhyaya: int,
        _range: tuple[int, int] | None = None,
        _shlokas: typing.Tuple[int, ...] | None = None,
    ) -> GitaQueryResponse:
        shlokas: typing.List[GitaShloka] = []
        if _range:
            for i in range(_range[0], _range[1] + 1):
                try:
                    shlokas.append(await GitaShloka.new(dbdriver, adhyaya, i))
                except ShlokaNotFound:
                    pass
        elif _shlokas is not None:
            for shloka in _shlokas:
                try:
                    shlokas.append(await GitaShloka.new(dbdriver, adhyaya, shloka))
                except ShlokaNotFound:
                    continue
        return GitaQueryResponse(
            adhyaya=adhyaya, range=_range, shlokas=_shlokas, responses=[s.to_payload() for s in shlokas]
        )