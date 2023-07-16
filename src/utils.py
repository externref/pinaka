from __future__ import annotations

import typing


class AttrsClassToPayload:
    def to_payload(self) -> typing.Dict[str, typing.Any]:
        attrs: list[str] = [a.name for a in self.__attrs_attrs__ if not a.name.startswith("_")]  # type: ignore
        return {key: getattr(self, key) for key in attrs}
