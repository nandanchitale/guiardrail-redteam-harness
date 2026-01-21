from openai import OpenAI
from guardrails.scrubbers import scrub
from guardrails.refusal import REFUSAL_MESSAGE
from config.loader import load_policy_prompt
from llm.router import call_llm
from guardrails.refusal_detectors import is_refusal

POLICY_PROMPT = load_policy_prompt()

def guarded_response(prompt: str):
    """Runs a prompt through the local LLM with guardrails applied.

    Args:
        prompt (str): prompt

    Returns:
        raw_output : str,
        final_output : str,
        blocked : bool
        
    """
    # 1. Call the LLM
    raw_output = call_llm([
            {"role": "system", "content": POLICY_PROMPT},
            {"role": "user", "content":prompt}
        ])
    
    raw_output = raw_output.strip()
    
    # 2. Detect explicit refusal from model
    if is_refusal(raw_output):
        return raw_output, raw_output, True
    
    # 3. Apply regex/ PII scrubber
    final, scrubbed = scrub(raw_output)
    
    # 4. Return result
    return raw_output, final, False