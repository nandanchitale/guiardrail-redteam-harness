import json
from harness.guarded_response import guarded_response
from harness.classifier import classify

with open("data/adversarial_prompts.json") as f:
    tests = json.load(f)
    
results = []

for test in tests:
    raw, final, blocked = guarded_response(test["prompt"])
    passed, failure = classify(test["expected"], final, blocked)
    
    results.append({
        "id": test["id"],
        "expected": test["expected"],
        "blocked": blocked,
        "passed": passed,
        "failure": failure,
        "raw": raw,
        "final" : final
    })
    
# -- Summary --
for result in results:
    status = "PASS" if result["passed"] else f"Fail ({result['failure']})"
    print(f"{result['id']} : {status}")
    
# -- Incident logs --
print("\n-- Incident log (Failures only) -- ")
for result in results:
    if(result["passed"]):
        continue
    
    print("\n--------------------------")
    print(f"Test ID : {result['id']}")
    print(f"Expected : {result['expected']}")
    print(f"Failure : {result['failure']}")
    print(result["raw"])
    print("\n----- Final Output -------")
    print(result["final"])