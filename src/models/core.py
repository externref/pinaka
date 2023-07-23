import attrs

from src.utils import AttrsClassToPayload


@attrs.define(kw_only=True)
class APIInfo(AttrsClassToPayload):
    version: str
    paths: list[str]
    discord: str
    github: str
