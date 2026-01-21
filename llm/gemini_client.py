import google.generativeai as genai
from config.env import require_env

def call_gemini(model: str, messages: list[dict])->str:
    """
        messages: [{"role":"system"|"user", "content":"..."}]
    """
    genai.configure(api_key=require_env("GEMINI_API_KEY"))
    system_prompt = ""
    user_prompt = ""
    
    for message in messages:
        if message["role"] == "system":
            system_prompt += message["content"] + "\n"
        elif message["role"] == "user":
            system_prompt += message["content"]
        
    model = genai.GenerativeModel(
        model_name=model,
        system_instruction=system_prompt
    )
    
    response = model.generate_content(
        user_prompt,
        safety_settings=None #IMPORTANT: don't let genini hide failures
    )
    
    return response.text.strip()