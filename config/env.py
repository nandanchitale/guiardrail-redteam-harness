import os
from dotenv import load_dotenv
from pathlib import Path

# def load_env():
#     # load .env from project root
#     env_path = Path(__file__).resolve().parents[1] / ".env"
#     print(f"Env path : {env_path}")
#     load_dotenv(dotenv_path=env_path)

def require_env(name: str)-> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environemt variable :{name}")
    return value