import requests

OLLAMA_URL = "http://localhost:11434/api/chat"

def call_ollama(model:str, messages: list[dict])-> str:
    response = requests.post(
        OLLAMA_URL,
        json={
            "model":model,
            "messages":messages,
            "stream":False
        },
        timeout=120
    )
    response.raise_for_status()
    return response.json()["message"]["content"].strip()