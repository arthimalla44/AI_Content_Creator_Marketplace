"""
CreatorHub AI - FastAPI Microservice
Production-ready API for Recommendation & AI-Powered Matching
"""

import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from recommendation_engine import CreatorRecommender

app = FastAPI(
    title="CreatorHub AI - ML & Recommendation API",
    description="Microservice powering AI creator recommendations, skill matching, and compatibility scoring.",
    version="1.0.0",
)

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas
class ProjectBrief(BaseModel):
    prompt: str = Field(..., min_length=3, description="Client brief or project prompt")
    budget: float = Field(default=5000.0, ge=0, description="Allocated budget in USD")
    timeline: Optional[str] = Field(default="4 days", description="Desired turnaround timeline")
    category: Optional[str] = Field(default=None, description="Optional target category")

class MatchRequest(BaseModel):
    brief: ProjectBrief
    creators: List[Dict[str, Any]] = Field(..., min_items=1, description="List of creator profiles to evaluate")

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "CreatorHub AI Recommendation Engine",
        "version": "1.0.0"
    }

@app.post("/api/match")
def match_creators(request: MatchRequest):
    try:
        recommender = CreatorRecommender(request.creators)
        results = [
            recommender.calculate_compatibility(request.brief.model_dump(), c)
            for c in request.creators
        ]
        # Sort by overall match descending
        results.sort(key=lambda x: x["overall_match"], reverse=True)
        return {
            "success": True,
            "count": len(results),
            "matches": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Match evaluation error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
