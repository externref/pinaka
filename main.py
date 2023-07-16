# type: ignore

from src.app import app  # noqa: F401

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("src.app:app", host="0.0.0.0", reload=True)
