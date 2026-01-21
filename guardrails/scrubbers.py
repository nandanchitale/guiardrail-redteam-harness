import re

PATTERNS = {
    "CREDIT_CARD" : re.compile(r"\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}[- ]\b"),
    "EMAIL" : re.compile(r"[\w\.-]+@[\w\.-]+\.\w+")
}

def scrub(text: str):
    scrubbed = False
    for name, pattern in PATTERNS.items():
        if pattern.search(text):
            text = pattern.sub(r"[REDACTED_{name}]", text)
            scrubbed = True
            
    return text, scrubbed