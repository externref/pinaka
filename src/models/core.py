import typing

import attrs

from src.utils import AttrsClassToPayload


@attrs.define(kw_only=True)
class APIInfo(AttrsClassToPayload):
    version: str
    paths: typing.List[str]
    discord: str
    github: str
