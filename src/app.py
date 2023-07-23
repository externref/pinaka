from __future__ import annotations

import contextlib
import os
import typing

import asyncpg
import dotenv
import fastapi
import starlette
from fastapi.staticfiles import StaticFiles

from src import models
from src.endpoints import endp
from src.exceptions import ShlokaNotFound

from . import __version__

dotenv.load_dotenv()
db_pool: asyncpg.Pool[asyncpg.Record] = None


async def create_pool() -> None:
    global db_pool
    db_pool = await asyncpg.create_pool(os.getenv("PGSQL_URL", ""))  # type: ignore


@contextlib.asynccontextmanager
async def setups(_: fastapi.FastAPI) -> typing.AsyncGenerator[typing.Any, None]:
    global db_pool
    if not db_pool:
        await create_pool()
    yield


app = fastapi.FastAPI(lifespan=setups, docs_url=None)

app.mount("/docs", StaticFiles(directory="site", html=True), name=".")


@app.get(endp._INDEX)
def api_info() -> typing.Dict[str, typing.Union[str, int, typing.List[str]]]:
    return models.APIInfo(
        version=__version__,
        paths=[route.path for route in app.routes if isinstance(route, fastapi.routing.APIRoute)],
        discord="https://discord.gg/aFqaUbKKx4",
        github="https://github.com/externref/pinaka",
    ).to_payload()


@app.get(endp.BHAGAVADGITA_SHLOKA)
async def get_gita_shloka(res: fastapi.Response, adhyaya: int, shloka: int) -> typing.Dict[str, typing.Union[str, int]]:
    try:
        shlkcls = await models.GitaShloka.new(db_pool, adhyaya, shloka)
        return shlkcls.to_payload()
    except ShlokaNotFound:
        return fastapi.Response(status_code=404)


@app.post(endp.BHAGAVADGITA_QUERY)
async def query_gita(query: models.GitaQuery) -> typing.Dict[str, typing.Any]:
    return (
        await models.GitaQueryResponse.new(
            db_pool, query.adhyaya, query.dict().get("range"), query.dict().get("shlokas")
        )
    ).to_payload()


@app.get(endp.SHIV_TANDAVA)
async def shivtandava() -> typing.List[models.TandavaShlokaDict]:
    return models.tandava.load_all_shlokas()


@app.get(endp.SHIV_TANDAVA_SHLOKA)
async def tandavashloka(shloka: int) -> models.TandavaShlokaDict:
    if shloka > 17:
        return fastapi.Response(status_code=404)

    return models.tandava.shlokas[shloka - 1].to_payload()
