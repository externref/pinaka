from __future__ import annotations

import typing
from src.utils import AttrsClassToPayload
import json

def load_all_shlokas() -> typing.List[TandavaShlokaDict]:
    with open(r"bin\shiv_tandava_strotam.json") as file:
        return json.load(file)


class TandavaShlokaDict(typing.TypedDict):
    shloka: int 
    original: str
    romanised: str 


class TandavaShloka(AttrsClassToPayload):
    shloka: int 
    original: str 
    romanised: str

    @classmethod
    def new(cls, data: TandavaShlokaDict) -> TandavaShloka:
        return TandavaShloka(**data)
        
# list of all shloka objects.
shlokas: typing.List[TandavaShloka] = [TandavaShloka.new(data) for data in load_all_shlokas()]
