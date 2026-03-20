import { useState } from "react";

type AIFeature =
  | "estimate_recommendation"
  | "ad_copy"
  | "social_calendar"
  | "website_copy"
  | "strategy_brief"
  | "onboarding_help"
  | "onboarding_assistant";

interface UseAIResult {
  generate: (feature: AIFeature, context: Record<string, any>) => Promise<string | null>;
  loading: boolean;
  error: string | null;
  result: string | null;
  reset: () => void;
}

function buildPrompt(feature: AIFeature, context: Record<string, any>): string {
  switch (feature) {
    case "estimate_recommendation":
      return `You are a senior digital marketing strategist at Clowd Marketing, a performance-driven agency.
Your job is to give concise, specific, actionable marketing recommendations based on a business's goals and budget.
Always be direct, confident, and results-focused. Format your response with clear sections using markdown.
Keep it under 300 words. Never use generic filler — every sentence should add value.

A business has filled out our estimate form with the following details:
Industry: ${context.industry}
Business Type: ${context.businessType}
Monthly Budget: $${context.budget}
Primary Goal: ${context.goal}
Location: ${context.location || "Not specified"}

Give them a personalized marketing recommendation: which services they need, why, realistic ROI expectations, and a suggested budget breakdown. Be specific to their industry.`;

    case "ad_copy":
      return `You are an expert direct-response copywriter specializing in Google Ads and Meta Ads.
Write high-converting ad copy that is specific, benefit-driven, and action-oriented.
Always include urgency or a clear value proposition. Format output as structured ad sets.

Write 3 complete ad variations for this business:
Company: ${context.company_name}
Industry: ${context.industry}
Location: ${context.location}
Target Audience: ${context.interests || "General audience"}
Campaign Goal: ${context.campaign_type || "Lead Generation"}
Platform: ${context.platforms || "Google & Meta"}

For each variation provide:
- Headline 1 (30 chars max)
- Headline 2 (30 chars max)
- Headline 3 (30 chars max)
- Description 1 (90 chars max)
- Description 2 (90 chars max)
- Primary CTA

Make each variation distinct in angle: one benefit-focused, one urgency-focused, one social proof-focused.`;

    case "social_calendar":
      return `You are a social media strategist and content creator.
Create detailed, platform-specific content calendars that drive engagement and brand awareness.
Be specific with post ideas — not generic. Each post should feel authentic to the brand.

Create a 2-week social media content calendar for:
Company: ${context.company_name}
Industry: ${context.industry}
Brand Tone: ${context.tone || "Professional"}
Primary Platform: ${context.primary_platform || "Instagram"}
Content Pillars: ${context.topics || "Industry tips, behind the scenes, client results"}
Posting Frequency: ${context.frequency || "5x per week"}

For each post provide:
- Day & Date slot
- Post type (Reel, Carousel, Static, Story)
- Caption (full, ready to post)
- 5 relevant hashtags
- Best time to post

Make posts feel real and brand-specific, not generic.`;

    case "website_copy":
      return `You are a conversion copywriter specializing in business websites.
Write compelling, SEO-friendly website copy that clearly communicates value and drives action.
Be specific to the business — avoid generic marketing speak. Every line should earn its place.

Write complete website copy for:
Company: ${context.company_name}
Industry: ${context.industry}
Services: ${context.services_offered}
Target Market: ${context.target_market}
Tagline: ${context.tagline || "Not provided"}
About: ${context.about_text}
Preferred CTA: ${context.call_to_action || "Get a Free Quote"}
Style: ${context.style || "Modern & Professional"}

Provide copy for:
1. Hero Section (headline + subheadline + CTA)
2. About Section (2-3 paragraphs)
3. Services Section (title + description for each service)
4. Why Choose Us (3-4 differentiators with short descriptions)
5. CTA Section (headline + supporting text + button text)

Write in a tone that matches their brand and speaks directly to their target market.`;

    case "strategy_brief":
      return `You are a senior marketing strategist at Clowd Marketing.
Write professional, detailed marketing strategy briefs that impress clients and set clear expectations.
Be specific, data-informed, and actionable. Format with clear sections using markdown.

Create a comprehensive 90-day marketing strategy brief for a new client:
Company: ${context.company_name}
Industry: ${context.industry}
Location: ${context.location}
Goals: ${context.goals}
Monthly Budget: $${context.monthly_budget || "Not specified"}
Campaign Type: ${context.campaign_type || "Lead Generation"}
Target Audience: Age ${context.age_range || "25-54"}, ${context.targeting_gender || "All"}, Interests: ${context.interests || "General"}
Ad Platforms: ${context.platforms || "Google & Meta"}
Website: ${context.website_url || "TBD"}

Structure the brief as:
## Executive Summary
## Target Audience Analysis
## Recommended Strategy (by channel)
## 90-Day Roadmap (Month 1, 2, 3 milestones)
## KPIs & Success Metrics
## Budget Allocation Breakdown
## Next Steps

Be specific and professional — this is a client-facing document.`;

    case "onboarding_help":
      return `You are a friendly onboarding specialist at Clowd Marketing.
Help clients fill out their onboarding forms by answering questions clearly and concisely.
Keep answers short (2-4 sentences max). Be helpful, not salesy. Use simple language.

Question: ${context.question}`;

    case "onboarding_assistant":
      return `You are a friendly, knowledgeable onboarding assistant at Clowd Marketing — a performance-driven digital marketing agency.
Your job is to help clients complete their onboarding forms by answering questions, giving examples, and explaining what information to provide.
Be concise (2-4 sentences), warm, and practical. Never be salesy. Use simple, clear language.
If the client asks for an example, give a real, specific one relevant to their service type.

Service type: ${context.service_type}
Current onboarding step: ${context.current_step}
Current field the client is filling out: ${context.current_field}

Conversation so far:
${context.conversation_history}

Client's question: ${context.user_question}

Answer helpfully and concisely.`;

    default:
      throw new Error("Unknown AI feature");
  }
}

export function useAI(): UseAIResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generate = async (
    feature: AIFeature,
    context: Record<string, any>
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("AI features are not yet configured. Please contact support.");
      }

      const prompt = buildPrompt(feature, context);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "AI request failed. Please try again.");
      }

      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
      if (!output) throw new Error("No response from AI. Please try again.");

      setResult(output);
      return output;
    } catch (err: any) {
      const msg = err.message || "AI generation failed. Please try again.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return { generate, loading, error, result, reset };
}
