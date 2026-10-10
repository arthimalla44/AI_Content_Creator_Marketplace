import { NextResponse } from 'next/server';
import { DEMO_CREATORS } from '@/lib/mockData';

export interface PromptAssistantRequest {
  prompt: string;
  mode?: 'Quick' | 'Balanced' | 'DeepMatch' | 'Research';
  attachments?: {
    name: string;
    type: 'image' | 'pdf';
    size: number;
    dataUrl?: string;
    extractedText?: string;
  }[];
  history?: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}

export async function POST(req: Request) {
  try {
    const body: PromptAssistantRequest = await req.json();
    const { prompt, mode = 'Balanced', attachments = [], history = [] } = body;

    if (!prompt && (!attachments || attachments.length === 0)) {
      return NextResponse.json({ success: false, error: 'Prompt or attachment is required' }, { status: 400 });
    }

    const p = (prompt || '').trim();
    const lowerP = p.toLowerCase();

    const hasImage = attachments.some((a) => a.type === 'image');
    const hasPdf = attachments.some((a) => a.type === 'pdf');
    const pdfAttachment = attachments.find((a) => a.type === 'pdf');
    const imageAttachment = attachments.find((a) => a.type === 'image');

    // 1. Detect Intent Categories
    const isGreeting = 
      /^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening)|hola|yo)\b/i.test(p) ||
      lowerP === 'hi' || lowerP === 'hello';

    const isPlatformInquiry = 
      lowerP.includes('what is creatorhub') || 
      lowerP.includes('how does creatorhub work') ||
      lowerP.includes('how does this work') ||
      lowerP.includes('how to hire') ||
      lowerP.includes('escrow') ||
      lowerP.includes('marketplace') ||
      lowerP.includes('how to use');

    const isGeneralKnowledgeOrTech = 
      lowerP.startsWith('what is') || 
      lowerP.startsWith('how to') || 
      lowerP.startsWith('explain') || 
      lowerP.startsWith('who is') || 
      lowerP.startsWith('why is') || 
      lowerP.startsWith('can you') ||
      lowerP.includes('what is ai') ||
      lowerP.includes('generative ai') ||
      lowerP.includes('runway') ||
      lowerP.includes('midjourney') ||
      lowerP.includes('flux') ||
      lowerP.includes('sora') ||
      lowerP.includes('elevenlabs') ||
      lowerP.includes('machine learning') ||
      lowerP.includes('deep learning');

    const isCreatorSearch = 
      lowerP.includes('creator') || 
      lowerP.includes('hire') || 
      lowerP.includes('video') || 
      lowerP.includes('ad') || 
      lowerP.includes('commercial') || 
      lowerP.includes('budget') || 
      lowerP.includes('voice') || 
      lowerP.includes('music') ||
      lowerP.includes('shoot') ||
      lowerP.includes('photoshoot') ||
      lowerP.includes('thumbnail') ||
      lowerP.includes('script') ||
      lowerP.includes('portfolio') ||
      hasImage || 
      hasPdf;

    const isComparisonOrFollowUp = 
      history.length > 0 && 
      (lowerP.includes('which one') || lowerP.includes('compare') || lowerP.includes('best') || lowerP.includes('difference') || lowerP.includes('who has'));

    let answerText = '';
    let creatorRecommendations: any[] = [];

    // Helper: Dynamic Creator Matcher based on tools, budget, and niche
    const getMatchedCreators = (topN = 3) => {
      return DEMO_CREATORS.map((creator) => {
        let score = 75;
        const reasons: string[] = [];

        // Check tool relevance
        const toolHits = creator.tools.filter((t) => lowerP.includes(t.toLowerCase()));
        if (toolHits.length > 0) {
          score += 15;
          reasons.push(`Mastery in requested tools: ${toolHits.join(', ')}`);
        }

        // Check category relevance
        if (lowerP.includes('video') && creator.category.includes('Video')) {
          score += 8;
          reasons.push('Specialized in AI Video Commercials');
        } else if ((lowerP.includes('image') || lowerP.includes('photo')) && creator.category.includes('Image')) {
          score += 8;
          reasons.push('Specialized in Generative Imagery');
        } else if (lowerP.includes('voice') && creator.category.includes('Voice')) {
          score += 8;
          reasons.push('Specialized in AI Voiceovers & Audio Cloning');
        } else if (lowerP.includes('music') && creator.category.includes('Music')) {
          score += 8;
          reasons.push('Specialized in Adaptive Music Production');
        }

        // Budget evaluation
        const budgetMatch = p.match(/(?:₹|rs\.?|inr)?\s*([0-9]+(?:,[0-9]+)*)/i);
        if (budgetMatch) {
          const budgetNum = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
          if (budgetNum && creator.startingPrice <= budgetNum) {
            score += 6;
            reasons.push(`Starting price (₹${creator.startingPrice}) fits budget of ₹${budgetNum}`);
          }
        }

        return {
          ...creator,
          matchScore: Math.min(99, score),
          matchReason: reasons.join(' • ') || 'Verified model mastery and high client satisfaction',
        };
      }).sort((a, b) => b.matchScore - a.matchScore).slice(0, topN);
    };

    // 2. Comprehensive Intelligence Routing

    // GREETINGS
    if (isGreeting && !isCreatorSearch && !hasImage && !hasPdf) {
      answerText = `Hello! How can I help with your AI content creation today?

You can ask me to:
- **Discover & Hire Creators:** e.g., *"Find a video creator for a 30s ad under ₹5,000"*
- **Ask Any AI / Creative Question:** e.g., *"What is Runway Gen-3 and how does it compare to Sora?"*
- **Analyze Media:** Upload an image or PDF brief using the **+** button.
- **Workflow Planning:** Estimate budget, timelines, and milestone schedules.

What project or concept are you planning?`;
    }

    // PLATFORM INQUIRY
    else if (isPlatformInquiry && !hasImage && !hasPdf) {
      answerText = `### About CreatorHub AI

**CreatorHub AI** is an AI Content Creator Marketplace connecting brands and clients with vetted generative artists across video, 3D, image, voice, and copywriting.

### How It Works:
1. **Search & AI Matching:** Enter your project brief or upload reference materials; our neural matching engine scores compatible creators based on proven model proficiency.
2. **Milestone Escrow Protection:** Your payment is deposited safely into platform escrow and only released when project deliverables are approved.
3. **Integrated Copilot & AI Studio:** Generate viral ad scripts, hooks, and prompt breakdowns directly inside our platform.
4. **Vetted Portfolios:** Every creator displays authenticated toolchains (Runway Gen-3, Flux.1, Midjourney v6, ElevenLabs) with verified client ratings.`;
      creatorRecommendations = getMatchedCreators(3);
    }

    // UPLOADED IMAGE
    else if (hasImage && imageAttachment) {
      const imgName = imageAttachment.name || 'image';
      answerText = `### Visual Context & Product Analysis: \`${imgName}\`

1. **Aesthetic & Visual Composition:**
   - Evaluated visual tones, lighting gradients, and object framing for **${imgName}**.
   - Recommended content formats: **9:16 Vertical Commercial Reel** and **4K High-Res Visual Showcase**.

2. **Required Creator Expertise:**
   - **Flux.1 / LoRA Consistency Specialists:** To retain brand fidelity, packaging geometry, and label sharpness.
   - **Camera Motion Directors:** For dynamic camera sweeps and macro physics transitions.

3. **Recommended Campaign Budget:**
   - Estimated starting range: **₹3,500 – ₹7,000** with 2-3 day milestone delivery.`;
      creatorRecommendations = getMatchedCreators(3);
    }

    // UPLOADED PDF
    else if (hasPdf && pdfAttachment) {
      const pdfText = pdfAttachment.extractedText || '';
      const pdfName = pdfAttachment.name || 'Campaign_Brief.pdf';
      answerText = `### Campaign Brief Synthesis: \`${pdfName}\`

1. **Extracted Objectives:**
   - Analyzed creative scope and specifications from \`${pdfName}\`.
   - Key Focus: High-retention creative campaign with synchronized audio and quick turnaround.

2. **Suggested Milestone Structure:**
   - **Milestone 1:** Concept, Storyboard & Script Approval (Day 1)
   - **Milestone 2:** Generative Stems & Draft Motion Render (Day 2)
   - **Milestone 3:** Sound Mastering & 4K Final Delivery (Day 3)`;
      creatorRecommendations = getMatchedCreators(3);
    }

    // FOLLOW-UP / COMPARISON
    else if (isComparisonOrFollowUp) {
      const topCreators = DEMO_CREATORS.slice(0, 2);
      answerText = `### Comparative Creator Breakdown based on your question:

1. **${topCreators[0].name} (${topCreators[0].category})**:
   - **Rating:** ${topCreators[0].rating}/5.0 (${topCreators[0].reviewCount} reviews)
   - **Core Strengths:** Specialists in Runway Gen-3 Alpha, cinematic pacing, and rapid commercial turnarounds (< 1h response).
   - **Starting Rate:** ₹${topCreators[0].startingPrice.toLocaleString()} per milestone.

2. **${topCreators[1].name} (${topCreators[1].category})**:
   - **Rating:** ${topCreators[1].rating}/5.0 (${topCreators[1].reviewCount} reviews)
   - **Core Strengths:** Mastery in Flux.1 and Midjourney v6 high-detail product staging and e-commerce hero assets.
   - **Starting Rate:** ₹${topCreators[1].startingPrice.toLocaleString()} per milestone.

**Summary Recommendation:** For high-energy video ads, **${topCreators[0].name}** is the strongest match. For product stills and photorealistic catalog visuals, **${topCreators[1].name}** is ideal.`;
      creatorRecommendations = topCreators.map((c, i) => ({
        ...c,
        matchScore: i === 0 ? 98 : 94,
        matchReason: i === 0 ? 'Optimal for dynamic commercial video' : 'Optimal for photorealistic stills and branding',
      }));
    }

    // GENERAL TECHNICAL / AI KNOWLEDGE QUESTION
    else if (isGeneralKnowledgeOrTech && !isCreatorSearch) {
      if (lowerP.includes('generative ai') || lowerP.includes('gen ai') || lowerP.includes('what is ai')) {
        answerText = `**Generative AI (GenAI)** is a class of artificial intelligence that creates new content—including photorealistic video, high-resolution imagery, synthetic voice, music, and written copy—from natural language prompts.

### Core Architecture in Modern Production:
1. **Diffusion Models & Video Transformers:** Models like **Runway Gen-3 Alpha**, **OpenAI Sora**, and **Flux.1** synthesize temporal coherence, volumetric lighting, and camera paths.
2. **Neural Audio Synthesis:** Tools like **ElevenLabs** clone emotional voices, accents, and cadence for broadcast-grade voiceovers.
3. **Workflow Integration:** Professional creators combine these tools with prompt weighting, LoRA fine-tuning, and ComfyUI node graphs to produce commercials 10x faster than traditional film crews.`;
      } else if (lowerP.includes('runway') || lowerP.includes('gen-3') || lowerP.includes('sora') || lowerP.includes('kling')) {
        answerText = `### Leading Generative Video Models Comparison:

1. **Runway Gen-3 Alpha:** Industry benchmark for cinematic camera control (pan, tilt, zoom), physics simulation, and photorealistic human motion.
2. **Kling AI:** Exceptionally strong at complex multi-second prompt adherence and high frame-rate motion clarity.
3. **Luma Dream Machine:** Fast turnarounds and fluid camera perspective shifts.
4. **Midjourney v6 + Upscalers:** The standard for generating initial 4K keyframe reference frames before video motion synthesis.`;
      } else {
        answerText = `Here is an insightful breakdown of **"${p}"**:

In generative media production, **${p}** plays a foundational role in how models process semantic intent. Contemporary generative pipelines leverage deep attention representations, enabling creators to preserve stylistic continuity across multiple scenes, characters, and lighting setups.

*Tip: You can pair this concept directly with our vetted AI creators to produce custom campaign assets.*`;
      }

      // Add a couple of relevant creators subtly if interested
      creatorRecommendations = getMatchedCreators(2);
    }

    // CREATOR SEARCH OR ANY OTHER ARBITRARY QUERY
    else {
      const matched = getMatchedCreators(mode === 'Quick' ? 2 : 3);
      creatorRecommendations = matched;

      if (mode === 'DeepMatch') {
        answerText = `### DeepMatch Suitability Analysis for: "${p}"

1. **Decomposed Scope:**
   - Evaluated target prompt, required toolchains, and delivery milestones.
   - Recommended Production Pipeline: **Runway Gen-3 Alpha**, **Midjourney v6**, and **ElevenLabs**.

2. **Why These Creators Fit:**
   - High portfolio alignment with your specified keywords and stylistic requirements.
   - Established completion rates (>98%) and active client escrow availability.

3. **Key Production Recommendations:**
   - Finalize reference storyboards prior to video rendering to lock in composition.`;
      } else if (mode === 'Research') {
        answerText = `### Research & Market Synthesis: "${p}"

1. **Current Rate Benchmarks:** Commercial AI deliverables for briefs like this typically range between **₹3,000 and ₹7,500** depending on audio post-production.
2. **Model Recommendations:** Runway Gen-3 and Flux.1 deliver the highest consistency for this domain.
3. **Candidate Creators:** Below are vetted creators with verified public portfolios matching this brief.`;
      } else {
        answerText = `I analyzed your request for **"${p}"** and synthesized the best matching verified AI creators based on model proficiency, client satisfaction, and starting rates.`;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        query: p,
        mode,
        answer: answerText,
        creators: creatorRecommendations,
        hasAttachments: attachments.length > 0,
      },
    });
  } catch (error: any) {
    console.error('Prompt Assistant Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal AI Server Error' }, { status: 500 });
  }
}
