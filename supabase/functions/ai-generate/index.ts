import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feature, context } = await req.json();

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) throw new Error("Gemini API key not configured. Please add GEMINI_API_KEY in Supabase Edge Function secrets.");

    let systemPrompt = "";
    let userPrompt = "";

    switch (feature) {
      case "estimate_recommendation":
        systemPrompt = `You are a senior digital marketing strategist at Clowd Marketing, a performance-driven agency. 
        Your job is to give concise, specific, actionable marketing recommendations based on a business's goals and budget.
        Always be direct, confident, and results-focused. Format your response with clear sections using markdown.
        Keep it under 300 words. Never use generic filler — every sentence should add value.`;
        userPrompt = `A business has filled out our estimate form with the following details:
        Industry: ${context.industry}
        Business Type: ${context.businessType}
        Monthly Budget: $${context.budget}
        Primary Goal: ${context.goal}
        Location: ${context.location || "Not specified"}
        
        Give them a personalized marketing recommendation: which services they need, why, realistic ROI expectations, and a suggested budget breakdown. Be specific to their industry.`;
        break;

      case "ad_copy":
        systemPrompt = `You are an expert direct-response copywriter specializing in Google Ads and Meta Ads.
        Write high-converting ad copy that is specific, benefit-driven, and action-oriented.
        Always include urgency or a clear value proposition. Format output as structured ad sets.`;
        userPrompt = `Write 3 complete ad variations for this business:
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
        break;

      case "social_calendar":
        systemPrompt = `You are a social media strategist and content creator. 
        Create detailed, platform-specific content calendars that drive engagement and brand awareness.
        Be specific with post ideas — not generic. Each post should feel authentic to the brand.`;
        userPrompt = `Create a 2-week social media content calendar for:
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
        break;

      case "website_copy":
        systemPrompt = `You are a conversion copywriter specializing in business websites.
        Write compelling, SEO-friendly website copy that clearly communicates value and drives action.
        Be specific to the business — avoid generic marketing speak. Every line should earn its place.`;
        userPrompt = `Write complete website copy for:
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
        break;

      case "strategy_brief":
        systemPrompt = `You are a senior marketing strategist at Clowd Marketing.
        Write professional, detailed marketing strategy briefs that impress clients and set clear expectations.
        Be specific, data-informed, and actionable. Format with clear sections using markdown.`;
        userPrompt = `Create a comprehensive 90-day marketing strategy brief for a new client:
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
        break;

      case "onboarding_help":
        systemPrompt = `You are a friendly onboarding specialist at Clowd Marketing.
        Help clients fill out their onboarding forms by answering questions clearly and concisely.
        Keep answers short (2-4 sentences max). Be helpful, not salesy. Use simple language.`;
        userPrompt = context.question;
        break;

      case "onboarding_assistant":
        systemPrompt = `You are a friendly, knowledgeable onboarding assistant at Clowd Marketing — a performance-driven digital marketing agency.
        Your job is to help clients complete their onboarding forms by answering questions, giving examples, and explaining what information to provide.
        Be concise (2-4 sentences), warm, and practical. Never be salesy. Use simple, clear language.
        If the client asks for an example, give a real, specific one relevant to their service type.`;
        userPrompt = `Service type: ${context.service_type}
        Current onboarding step: ${context.current_step}
        Current field the client is filling out: ${context.current_field}
        
        Conversation so far:
        ${context.conversation_history}
        
        Client's question: ${context.user_question}
        
        Answer helpfully and concisely.`;
        break;

      default:
        throw new Error("Unknown feature requested");
    }

    // Combine system and user prompts for Gemini (it uses a single "contents" format)
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Gemini API error");
    }

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!result) throw new Error("No response from AI");

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
