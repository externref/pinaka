from __future__ import annotations

import contextlib
import logging
import os
import typing

import asyncpg
import dotenv
import fastapi
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from src import models
from src.endpoints import endp
from src.exceptions import ShlokaNotFound

from . import __version__

dotenv.load_dotenv()
db_pool: asyncpg.Pool[asyncpg.Record] = None # type: ignore


@contextlib.asynccontextmanager
async def setups(_: fastapi.FastAPI) -> typing.AsyncGenerator[typing.Any, None]:
    global db_pool
    if not db_pool:
        db_pool = await asyncpg.create_pool(os.getenv("PGSQL_URL", ""))  # type: ignore
    yield


app = fastapi.FastAPI(lifespan=setups, docs_url="/_devdocs")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/docs", StaticFiles(directory="./site", html=True), name=".")

try:
    app.mount("/ui", StaticFiles(directory="./ui", html=True), name="ui")
    app.mount("/_app", StaticFiles(directory="./ui/_app"), name="_app")
except RuntimeError:
    logging.info("Continuing without user interface.")
    

@app.get("/samarkan.ttf")
async def samarkan_font() -> fastapi.responses.FileResponse:
    return fastapi.responses.FileResponse("./docs/assets/samarkan.ttf")

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
        return fastapi.Response(status_code=404) # type: ignore


@app.post(endp.BHAGAVADGITA_QUERY)
async def query_gita(query: models.GitaQuery) -> typing.Dict[str, typing.Any]:
    return (
        await models.GitaQueryResponse.new(
            db_pool, query.adhyaya, query.model_dump().get("range"), query.model_dump().get("shlokas")
        )
    ).to_payload()


@app.get(endp.SHIV_TANDAVA)
async def shivtandava() -> typing.List[models.TandavaShlokaDict]:
    return models.tandava.load_all_shlokas()


@app.get(endp.SHIV_TANDAVA_SHLOKA)
async def tandavashloka(shloka: int) -> typing.Dict[str, typing.Any]:
    if shloka > 17:
        return fastapi.Response(status_code=404) # type: ignore

    return models.tandava.shlokas[shloka - 1].to_payload()
