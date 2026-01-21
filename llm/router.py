import os

def call_llm(messages: list[dict])-> str:
    provider=os.getenv("LLM_PROVIDER", "ollama")
    
    if provider == "ollama":
        from llm.local_ollama import call_ollama
        model = os.getenv("OLLAMA_MODEL","llama3.1:8b")
        return call_ollama(model=model, messages=messages)
    if provider == "gemini":
        from llm.gemini_client import call_gemini
        return call_gemini (
            model=os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
            messages=messages
        )
    
    raise RuntimeError(f"Unsupported LLM Provider {provider}")