from __future__ import annotations

import contextlib
import os
import typing

import asyncpg
import dotenv
import fastapi

from src import models
from src.endpoints import endp
from src.exceptions import ShlokaNotFound

from . import __version__

dotenv.load_dotenv()
db_pool: asyncpg.Pool[asyncpg.Record]


@contextlib.asynccontextmanager
async def setups(_: fastapi.FastAPI) -> typing.AsyncGenerator[typing.Any, None]:
    global db_pool
    db_pool = await asyncpg.create_pool(os.getenv("PGSQL_URL", ""))  # type: ignore
    yield


app = fastapi.FastAPI(lifespan=setups)


@app.get(endp._INDEX)
def api_info() -> typing.Dict[str, typing.Union[str, int, typing.List[str]]]:
    return models.APIInfo(
        version=__version__, paths=[route.path for route in app.routes if isinstance(route, fastapi.routing.APIRoute)],
        discord="https://discord.gg/aFqaUbKKx4",
        github="https://github.com/externref/"
    ).to_payload()


@app.get(endp.BHAGAVADGITA_SHLOKA)
async def get_gita_shloka(res: fastapi.Response, adhyaya: int, shloka: int) -> typing.Dict[str, typing.Union[str, int]]:
    try:
        shlkcls = await models.GitaShloka.new(db_pool, adhyaya, shloka)
        return shlkcls.to_payload()
    except ShlokaNotFound as e:
        return fastapi.Response(status_code=404)


@app.post(endp.BHAGAVADGITA_QUERY)
async def query_gita(query: models.GitaQuery):
    return (
        await models.GitaQueryResponse.new(
            db_pool, query.adhyaya, query.dict().get("range"), query.dict().get("shlokas")
        )
    ).to_payload()
