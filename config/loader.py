from pathlib import Path

def load_policy_prompt() -> str:
    policy_path = Path(__file__).parent / "POLICY_PROMPT.txt"
    return policy_path.read_text(encoding="utf-8")