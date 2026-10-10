"""
CreatorHub AI - AI/ML Recommendation & Compatibility Match Engine
Implements multi-factor weighted scoring for client briefs vs creator profiles.
"""

from typing import List, Dict, Any

class CreatorRecommender:
    def __init__(self, creators: List[Dict[str, Any]]):
        self.creators = creators

    def calculate_compatibility(self, brief: Dict[str, Any], creator: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates multi-dimensional match score between client requirements and creator toolchains.
        """
        prompt = brief.get("prompt", "").lower()
        budget = brief.get("budget", 5000)
        
        # 1. Tool Match
        tools = [t.lower() for t in creator.get("tools", [])]
        tool_hits = sum(1 for t in tools if t in prompt or any(word in t for word in prompt.split()))
        tool_score = min(98, 75 + tool_hits * 10)

        # 2. Skill Match
        category = creator.get("category", "").lower()
        is_video_brief = "video" in prompt or "ad" in prompt or "commercial" in prompt
        skill_score = 96 if (is_video_brief and "video" in category) else 85

        # 3. Budget Match
        starting_price = creator.get("starting_price", 3000)
        budget_ratio = min(1.0, budget / max(1, starting_price))
        budget_score = int(80 + budget_ratio * 15)

        # 4. Overall Weighted Score
        overall = int(0.35 * tool_score + 0.35 * skill_score + 0.30 * budget_score)

        return {
            "creator_id": creator.get("id"),
            "creator_name": creator.get("name"),
            "overall_match": overall,
            "breakdown": {
                "tool_match": tool_score,
                "skill_match": skill_score,
                "budget_match": budget_score,
                "timeline_match": 94,
                "style_match": 92
            }
        }

if __name__ == "__main__":
    sample_creators = [
        {"id": "c1", "name": "Elena Rostova", "category": "AI Video Creators", "tools": ["Runway Gen-3", "Midjourney"], "starting_price": 3500},
        {"id": "c2", "name": "Zack Chen", "category": "AI Image Creators", "tools": ["Flux.1", "Midjourney"], "starting_price": 2000}
    ]
    recommender = CreatorRecommender(sample_creators)
    result = recommender.calculate_compatibility(
        {"prompt": "30-second AI product video advertisement with Runway Gen-3", "budget": 5000},
        sample_creators[0]
    )
    print("Match Analysis Result:", result)
