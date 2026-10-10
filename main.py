"""
CreatorHub AI - Backend Root Entry Point
Delegates directly to the recommendation engine in ai-ml
"""

import sys
import os

import importlib.util

aiml_dir = os.path.join(os.path.dirname(__file__), "ai-ml")
sys.path.insert(0, aiml_dir)

spec = importlib.util.spec_from_file_location("aiml_main", os.path.join(aiml_dir, "main.py"))
aiml_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aiml_module)

app = aiml_module.app

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
