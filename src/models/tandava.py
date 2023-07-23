from __future__ import annotations

import json
import typing

import attrs
import typing_extensions

from src.utils import AttrsClassToPayload


def load_all_shlokas() -> typing.List[TandavaShlokaDict]:
    with open("./bin/shiv_tandava_strotam.json", encoding="utf-8") as file:
        return json.load(file)


class TandavaShlokaDict(typing_extensions.TypedDict):
    shloka: int
    original: str
    romanised: str


@attrs.define(kw_only=True)
class TandavaShloka(AttrsClassToPayload):
    shloka: int
    original: str
    romanised: str

    @classmethod
    def new(cls, data: TandavaShlokaDict) -> TandavaShloka:
        return TandavaShloka(**data)


# list of all shloka objects.
shlokas: typing.List[TandavaShloka] = [TandavaShloka.new(data) for data in load_all_shlokas()]
