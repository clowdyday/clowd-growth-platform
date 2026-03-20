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

// ─── Industry Intelligence ────────────────────────────────────────────────────
// Each industry entry defines: best channels, content angles, KPIs, audience
// behavior, ad copy style, posting times, and SEO keywords.
// This is injected into every prompt so outputs are deeply niche-specific.

interface IndustryProfile {
  channels: string;
  adStyle: string;
  contentAngles: string;
  audienceBehavior: string;
  kpis: string;
  seoKeywords: string;
  postingTimes: string;
  budgetSplit: string;
  benchmarks: string;
  avoidMistakes: string;
}

function getIndustryProfile(industry: string): IndustryProfile {
  const i = (industry || "").toLowerCase();

  if (i.includes("e-commerce") || i.includes("ecommerce") || i.includes("retail")) {
    return {
      channels: "Google Shopping, Meta Dynamic Product Ads, Instagram Shopping, retargeting campaigns, email flows",
      adStyle: "Product-specific, price-driven, urgency-based (limited stock, flash sale). Lead with the product image and benefit. Use social proof (reviews, ratings). Strong discount or free shipping hooks.",
      contentAngles: "Product showcases, unboxing, before/after, customer reviews, UGC reposts, behind-the-scenes packing, seasonal promotions, 'how to style/use' tutorials",
      audienceBehavior: "Browses on mobile, impulse-buys, responds to scarcity and social proof, compares prices, abandons carts. Retargeting is critical — 70%+ of revenue comes from returning visitors.",
      kpis: "ROAS (target 3–6x), CPA, Add-to-Cart rate, Checkout Abandonment rate, Average Order Value, Return Customer Rate",
      seoKeywords: "product-specific terms, brand name + product, 'buy [product] online', '[product] free shipping', '[product] reviews'",
      postingTimes: "Tuesday, Wednesday, Friday — 11am–1pm or 7–9pm (peak shopping windows)",
      budgetSplit: "50% Google Shopping, 30% Meta retargeting, 20% prospecting/awareness",
      benchmarks: "Average ROAS: 3–5x. CPC: $0.50–$2.00 (Google Shopping). CTR: 1.5–3%. Cart abandonment recovery: 15–25% with retargeting.",
      avoidMistakes: "Never run broad campaigns without product feed optimization. Always retarget cart abandoners. Don't ignore mobile — 70%+ of e-commerce traffic is mobile.",
    };
  }

  if (i.includes("health") || i.includes("wellness") || i.includes("fitness") || i.includes("gym")) {
    return {
      channels: "Meta Ads (Instagram/Facebook), Google Search, YouTube pre-roll, influencer partnerships, organic Instagram/TikTok",
      adStyle: "Transformation-focused, aspirational, before/after results, community-driven. Lead with the outcome (lose 20lbs, feel energized). Use real client testimonials. Avoid medical claims.",
      contentAngles: "Client transformations, workout tips, nutrition advice, 'day in the life', myth-busting, motivational quotes, behind-the-scenes, challenges and accountability",
      audienceBehavior: "Highly visual, responds to aspirational content, active on Instagram and TikTok, makes decisions emotionally, responds to community and belonging. Peak engagement early morning and post-work.",
      kpis: "Cost per Lead, Trial Signup Rate, Member Retention Rate, Cost per Acquisition, Lifetime Value",
      seoKeywords: "'[city] gym', '[city] personal trainer', 'weight loss program [city]', 'online fitness coaching', 'nutrition coaching near me'",
      postingTimes: "Monday, Wednesday, Friday — 6–8am (pre-workout) or 5–7pm (post-work)",
      budgetSplit: "40% Meta lead gen, 30% Google Search (local), 20% retargeting, 10% YouTube",
      benchmarks: "CPL: $15–$40 for gym leads. CTR: 1.5–2.5%. Trial-to-member conversion: 30–50% with good follow-up.",
      avoidMistakes: "Never make specific medical or weight loss claims in ads. Always use real client photos over stock. Don't ignore local SEO — most gym decisions are location-based.",
    };
  }

  if (i.includes("real estate")) {
    return {
      channels: "Meta Lead Ads, Google Search, YouTube, Zillow/Realtor.com listings, local SEO, email nurture sequences",
      adStyle: "Listing-focused, neighborhood authority, trust-building. Lead with property visuals or local market stats. Use 'free home valuation' or 'see homes in [area]' hooks. Long sales cycle — nurture is critical.",
      contentAngles: "New listings, neighborhood spotlights, market updates, home buying/selling tips, client success stories, 'just sold' posts, local community content, mortgage rate updates",
      audienceBehavior: "Long research phase (3–12 months), high intent when ready, responds to local expertise and trust signals. Uses Google to search agents and Zillow to browse listings. Needs multiple touchpoints before converting.",
      kpis: "Cost per Lead, Lead-to-Appointment Rate, Appointment-to-Close Rate, Cost per Closed Deal, Days on Market",
      seoKeywords: "'[city] real estate agent', 'homes for sale in [neighborhood]', '[city] realtor', 'sell my home in [city]', '[city] housing market'",
      postingTimes: "Tuesday, Thursday, Saturday — 9–11am (weekend browsing peaks for listings)",
      budgetSplit: "40% Meta lead ads, 35% Google Search, 15% retargeting, 10% YouTube/video",
      benchmarks: "CPL: $20–$80 for real estate leads. Google Search CTR: 3–6%. Lead-to-close: 1–3% (industry average). Top agents close 5–10%.",
      avoidMistakes: "Never skip the nurture sequence — real estate leads take weeks to months to convert. Always geo-target tightly. Don't run ads without a strong CRM follow-up system.",
    };
  }

  if (i.includes("saas") || i.includes("software") || i.includes("tech") || i.includes("technology")) {
    return {
      channels: "Google Search, LinkedIn Ads, content marketing/SEO, Product Hunt, G2/Capterra reviews, retargeting, email sequences",
      adStyle: "Benefit-driven, problem-solution framing, feature-specific for bottom-funnel. Lead with the pain point solved. Use free trial, demo, or ROI calculator hooks. B2B: LinkedIn for decision-makers. B2C: Google + Meta.",
      contentAngles: "Product tutorials, use case walkthroughs, customer case studies with ROI numbers, comparison posts ('vs competitors'), industry reports, thought leadership, feature announcements",
      audienceBehavior: "Researches extensively before buying, reads reviews on G2/Capterra, responds to free trials and demos, influenced by case studies and ROI data. B2B buyers involve 3–7 stakeholders.",
      kpis: "Trial Signup Rate, Trial-to-Paid Conversion, MRR, Churn Rate, CAC, LTV:CAC Ratio, Demo Booking Rate",
      seoKeywords: "'[software category] software', '[competitor] alternative', 'best [software type] for [use case]', '[software name] reviews', '[software type] pricing'",
      postingTimes: "Tuesday–Thursday — 9–11am or 2–4pm (business hours, decision-maker active time)",
      budgetSplit: "35% Google Search, 30% LinkedIn (B2B) or Meta (B2C), 20% content/SEO, 15% retargeting",
      benchmarks: "Trial signup CPL: $30–$150. LinkedIn CPL: $50–$200. Free trial to paid: 15–25% (good product). CAC payback: 12–18 months for healthy SaaS.",
      avoidMistakes: "Never skip the free trial or demo offer — SaaS buyers need to experience the product. Don't ignore review sites. Always track LTV, not just CAC.",
    };
  }

  if (i.includes("restaurant") || i.includes("food") || i.includes("hospitality") || i.includes("cafe") || i.includes("bar")) {
    return {
      channels: "Meta Ads (local radius), Google My Business, Instagram organic, Google Search (local), Yelp/TripAdvisor, influencer/food blogger partnerships",
      adStyle: "Visually-driven, appetite appeal, local urgency. Lead with high-quality food photography. Use 'order now', 'reserve a table', or 'limited weekend special' hooks. Geo-target within 5–10 miles.",
      contentAngles: "Dish showcases, chef behind-the-scenes, daily specials, customer reviews, event announcements, seasonal menus, 'how it's made' videos, staff spotlights",
      audienceBehavior: "Decides based on visuals and reviews, searches 'restaurants near me' on Google Maps, influenced by Instagram aesthetics and Yelp ratings. Impulse decisions — proximity and hunger drive action.",
      kpis: "Cost per Reservation, Table Fill Rate, Online Order Volume, Google Maps ranking, Review Rating, Repeat Visit Rate",
      seoKeywords: "'[cuisine type] restaurant [city]', 'best [cuisine] near me', '[city] date night restaurant', '[dish] [city]', 'restaurants open now [city]'",
      postingTimes: "Wednesday–Friday — 11am–1pm (lunch decision window) or 5–7pm (dinner planning)",
      budgetSplit: "40% Meta local ads, 30% Google (Maps + Search), 20% organic social, 10% influencer/events",
      benchmarks: "CPR (cost per reservation): $3–$15. Google Maps click-to-call: 5–10% of profile views. Instagram reach: 10–20% of followers organically.",
      avoidMistakes: "Never use stock food photos — real food photography is non-negotiable. Always keep Google My Business updated. Don't ignore Yelp/TripAdvisor review responses.",
    };
  }

  if (i.includes("home service") || i.includes("contractor") || i.includes("plumb") || i.includes("hvac") || i.includes("roofing") || i.includes("landscap") || i.includes("cleaning")) {
    return {
      channels: "Google Local Services Ads (LSA), Google Search, Meta lead ads, Nextdoor, Yelp, local SEO, referral programs",
      adStyle: "Trust-first, local authority, urgency for emergency services. Lead with licensing, years of experience, and local presence. Use 'free estimate', 'same-day service', or 'licensed & insured' hooks.",
      contentAngles: "Before/after project photos, customer testimonials, educational tips ('signs you need a new roof'), seasonal reminders, team introductions, local community involvement, job site videos",
      audienceBehavior: "High-intent searches ('emergency plumber near me'), trusts reviews and word-of-mouth, makes quick decisions for urgent needs, slower for planned projects. Nextdoor and Google are primary discovery channels.",
      kpis: "Cost per Lead, Lead-to-Booked Job Rate, Average Job Value, Repeat Customer Rate, Google Review Rating",
      seoKeywords: "'[service] [city]', '[service] near me', 'emergency [service] [city]', 'licensed [service] [city]', '[service] cost [city]'",
      postingTimes: "Monday, Wednesday — 7–9am (homeowners planning their day) or 6–8pm (after work)",
      budgetSplit: "40% Google LSA/Search, 30% Meta lead ads, 20% local SEO, 10% Nextdoor/Yelp",
      benchmarks: "Google LSA CPL: $20–$80. Google Search CPL: $30–$120. Lead-to-booked: 40–60% with fast follow-up (under 5 min response time).",
      avoidMistakes: "Never let leads go cold — call within 5 minutes or lose them. Always get Google reviews after every job. Don't skip Google LSA — it's the highest-intent channel for home services.",
    };
  }

  if (i.includes("professional service") || i.includes("law") || i.includes("accounting") || i.includes("financial") || i.includes("consulting") || i.includes("insurance")) {
    return {
      channels: "Google Search, LinkedIn, content marketing/SEO, referral networks, email nurture, webinars",
      adStyle: "Authority-driven, trust-building, problem-solution. Lead with credentials, results, and specificity. Use 'free consultation', 'free audit', or 'case study' hooks. Avoid hype — credibility is everything.",
      contentAngles: "Educational content (tax tips, legal guides, financial planning), case studies with results, thought leadership, FAQ posts, industry news commentary, client success stories (anonymized)",
      audienceBehavior: "High-consideration purchase, researches extensively, relies on referrals and reviews, values expertise over price. LinkedIn is key for B2B. Google Search captures high-intent buyers.",
      kpis: "Cost per Consultation, Consultation-to-Client Rate, Client Lifetime Value, Referral Rate, Cost per Acquisition",
      seoKeywords: "'[service type] [city]', 'best [profession] near me', '[profession] for [specific need]', '[profession] fees [city]', 'how to [problem they solve]'",
      postingTimes: "Tuesday–Thursday — 8–10am or 12–1pm (business decision-making hours)",
      budgetSplit: "40% Google Search, 30% LinkedIn (B2B) or Meta (B2C), 20% content/SEO, 10% retargeting",
      benchmarks: "CPL: $50–$200 for professional services. Consultation-to-client: 20–40%. Referral programs can reduce CAC by 50%+.",
      avoidMistakes: "Never use vague messaging — specificity builds trust. Always have a strong follow-up sequence. Don't ignore LinkedIn for B2B professional services.",
    };
  }

  if (i.includes("education") || i.includes("coaching") || i.includes("course") || i.includes("training")) {
    return {
      channels: "Meta Ads, YouTube, Google Search, email marketing, webinars/free workshops, organic content (LinkedIn, Instagram, TikTok)",
      adStyle: "Transformation-focused, outcome-driven, authority-building. Lead with the result the student achieves. Use free webinar, free mini-course, or 'limited enrollment' hooks. Social proof is critical.",
      contentAngles: "Student success stories, free value content (tips, mini-lessons), behind-the-scenes of teaching, 'what you'll learn' breakdowns, myth-busting, Q&A sessions, day-in-the-life",
      audienceBehavior: "Needs to trust the educator before buying, responds to free value content, influenced by testimonials and transformation stories. Webinars convert at 5–15%. Email nurture is critical.",
      kpis: "Webinar Registration Rate, Show-Up Rate, Conversion Rate, Cost per Enrollment, Student Completion Rate, Refund Rate",
      seoKeywords: "'[topic] course online', 'learn [skill] fast', 'best [topic] coach', '[topic] certification', 'how to [skill] for beginners'",
      postingTimes: "Monday, Wednesday, Friday — 7–9am or 7–9pm (before/after work learning mindset)",
      budgetSplit: "40% Meta (webinar/lead gen), 25% YouTube, 20% Google Search, 15% email/retargeting",
      benchmarks: "Webinar CPR: $5–$25. Show-up rate: 30–50%. Webinar-to-sale: 5–15%. Email sequence conversion: 2–8%.",
      avoidMistakes: "Never skip the free value offer — cold audiences don't buy courses. Always follow up with email sequences. Don't ignore YouTube — it's the #1 platform for educational content discovery.",
    };
  }

  if (i.includes("beauty") || i.includes("salon") || i.includes("spa") || i.includes("barber") || i.includes("nail") || i.includes("aesthet")) {
    return {
      channels: "Instagram, TikTok, Meta Ads (local), Google My Business, Yelp, referral programs, booking platform SEO (Vagaro, Booksy, StyleSeat)",
      adStyle: "Visually stunning, transformation-focused, portfolio-driven. Lead with before/after photos or video. Use 'book now', 'limited appointments', or 'new client special' hooks. Local radius targeting.",
      contentAngles: "Before/after transformations, technique videos, product recommendations, client spotlights, trending styles, behind-the-scenes, seasonal looks, 'get ready with me' content",
      audienceBehavior: "Highly visual, books based on portfolio quality and reviews, loyal to stylists they trust, influenced by Instagram/TikTok aesthetics. Searches 'hair salon near me' or '[service] [city]'.",
      kpis: "New Client Bookings, Rebooking Rate, Average Ticket Value, Cost per Booking, Google Review Rating, Instagram Follower Growth",
      seoKeywords: "'[service] [city]', 'best [service] near me', '[stylist type] [city]', '[trending style] [city]', '[service] prices [city]'",
      postingTimes: "Tuesday, Thursday, Saturday — 10am–12pm (booking planning time)",
      budgetSplit: "50% organic Instagram/TikTok, 30% Meta local ads, 15% Google My Business, 5% Yelp",
      benchmarks: "Meta CPB (cost per booking): $5–$25. Instagram organic reach: 10–20% of followers. Rebooking rate goal: 60–80%.",
      avoidMistakes: "Never post low-quality photos — your portfolio IS your ad. Always respond to reviews. Don't ignore TikTok — it's the fastest-growing discovery channel for beauty services.",
    };
  }

  // Default — general service business
  return {
    channels: "Google Search, Meta Ads (Facebook/Instagram), local SEO, Google My Business, email marketing",
    adStyle: "Benefit-driven, trust-building, clear value proposition. Lead with the primary outcome the client gets. Use 'free consultation', 'get a quote', or 'see results' hooks.",
    contentAngles: "Client results and testimonials, educational tips, behind-the-scenes, team introductions, FAQs, industry insights, before/after results",
    audienceBehavior: "Researches online before deciding, reads reviews, compares options, responds to social proof and clear value propositions. Google captures high-intent, Meta builds awareness.",
    kpis: "Cost per Lead, Lead-to-Client Conversion Rate, Cost per Acquisition, Client Lifetime Value, Return on Ad Spend",
    seoKeywords: "'[service] [city]', '[service] near me', 'best [service] [city]', '[service] cost', 'how to [problem they solve]'",
    postingTimes: "Tuesday, Wednesday, Thursday — 9–11am or 12–2pm",
    budgetSplit: "40% Google Search, 35% Meta Ads, 15% retargeting, 10% organic/SEO",
    benchmarks: "Average CPL: $30–$100. CTR: 1.5–3%. Lead-to-client: 20–40% with good follow-up.",
    avoidMistakes: "Never run ads without a clear landing page. Always follow up leads within 5 minutes. Don't ignore Google My Business — it's free and drives high-intent traffic.",
  };
}

// ─── Prompt Builder ───────────────────────────────────────────────────────────

function buildPrompt(feature: AIFeature, context: Record<string, any>): string {
  const profile = getIndustryProfile(context.industry || "");

  switch (feature) {

    case "estimate_recommendation":
      return `You are a senior digital marketing strategist at Clowd Marketing — a performance-driven agency specializing in paid ads, SEO, and conversion-focused web design.

INDUSTRY INTELLIGENCE FOR ${(context.industry || "this industry").toUpperCase()}:
- Best Channels: ${profile.channels}
- Ad Style: ${profile.adStyle}
- Key KPIs: ${profile.kpis}
- Audience Behavior: ${profile.audienceBehavior}
- Realistic Benchmarks: ${profile.benchmarks}
- Budget Split: ${profile.budgetSplit}
- Common Mistakes to Avoid: ${profile.avoidMistakes}

Business Details:
- Industry: ${context.industry}
- Company: ${context.businessType}
- Monthly Budget: $${context.budget}
- Primary Goal: ${context.goal}
- Location: ${context.location || "Not specified"}

Using the industry intelligence above, deliver a precise, personalized recommendation. Reference specific benchmarks, channels, and tactics that are proven for this industry. No generic advice.

Respond in this exact format:

## Your Personalized Marketing Strategy
*Prepared by Clowd Marketing*

### What We Recommend for ${context.industry}
[2-3 sentences — specific channels and tactics proven for this industry, tied to their goal and budget]

### Why This Works for ${context.industry} Businesses
[Reference the audience behavior and channel strengths specific to this niche — include real benchmarks]

### Suggested Budget Breakdown
[Table: Channel | Monthly Spend | Expected Outcome — based on the ${profile.budgetSplit} split for this industry]

### Realistic Results in 90 Days
[Specific KPIs with realistic ranges based on $${context.budget}/month in ${context.industry} — use the benchmarks above]

### What to Avoid
[1-2 common mistakes specific to ${context.industry} marketing]

### Your Next Step
[Clear CTA to book a strategy call with Clowd Marketing]

---
*Prepared by Clowd Marketing. Book a free strategy call to get your full custom plan.*`;

    case "ad_copy":
      return `You are a senior direct-response copywriter at Clowd Marketing, specializing in high-converting Google Ads and Meta Ads.

INDUSTRY INTELLIGENCE FOR ${(context.industry || "this industry").toUpperCase()}:
- Ad Style: ${profile.adStyle}
- Audience Behavior: ${profile.audienceBehavior}
- Key Hooks That Work: ${profile.adStyle}
- Avoid: ${profile.avoidMistakes}

Business Details:
- Company: ${context.company_name}
- Industry: ${context.industry}
- Location: ${context.location}
- Target Audience: ${context.interests || "General audience"}
- Campaign Goal: ${context.campaign_type || "Lead Generation"}
- Platforms: ${context.platforms || "Google & Meta"}

Write 3 distinct, ready-to-launch ad variations using the industry intelligence above. Every headline and description must be specific to this business, industry, and audience — no placeholders, no generic copy.

Rules:
- Headline 1, 2, 3: Max 30 characters each (count every character carefully)
- Description 1, 2: Max 90 characters each (count every character carefully)
- No exclamation marks in headlines (Google policy)
- Use industry-specific language, hooks, and value propositions
- Each variation must use a completely different angle

---
*Ad Copy prepared by Clowd Marketing*

## Variation 1 — Benefit-Focused
**Headline 1:** [max 30 chars]
**Headline 2:** [max 30 chars]
**Headline 3:** [max 30 chars]
**Description 1:** [max 90 chars]
**Description 2:** [max 90 chars]
**CTA:** [button text]

## Variation 2 — Urgency-Focused
**Headline 1:** [max 30 chars]
**Headline 2:** [max 30 chars]
**Headline 3:** [max 30 chars]
**Description 1:** [max 90 chars]
**Description 2:** [max 90 chars]
**CTA:** [button text]

## Variation 3 — Social Proof-Focused
**Headline 1:** [max 30 chars]
**Headline 2:** [max 30 chars]
**Headline 3:** [max 30 chars]
**Description 1:** [max 90 chars]
**Description 2:** [max 90 chars]
**CTA:** [button text]

---
*Ready to launch? Contact your Clowd Marketing account manager to get these live today.*`;

    case "social_calendar":
      return `You are a senior social media strategist and SEO content specialist at Clowd Marketing.

INDUSTRY INTELLIGENCE FOR ${(context.industry || "this industry").toUpperCase()}:
- Best Content Angles: ${profile.contentAngles}
- Audience Behavior: ${profile.audienceBehavior}
- Best Posting Times: ${profile.postingTimes}
- SEO Keywords to Weave In: ${profile.seoKeywords}
- Avoid: ${profile.avoidMistakes}

Business Details:
- Company: ${context.company_name}
- Industry: ${context.industry}
- Brand Tone: ${context.tone || "Professional but approachable"}
- Primary Platform: ${context.primary_platform || "Instagram"}
- Content Pillars: ${context.topics || profile.contentAngles}
- Posting Frequency: ${context.frequency || "5x per week"}

Generate a 2-week content calendar using the industry-specific content angles and posting times above. Every caption must:
- Open with a scroll-stopping hook (first line must grab attention)
- Weave in the SEO keywords naturally for discoverability
- Be minimum 150 words — detailed, engaging, ready to post
- Have a clear call-to-action
- Use line breaks for readability (no walls of text)
- Feel authentic to the ${context.industry} industry — not generic

---
*Content Calendar prepared by Clowd Marketing*

## Week 1

### Post 1 — [Day], [Date]
**Platform:** ${context.primary_platform || "Instagram"}
**Post Type:** [Reel / Carousel / Static / Story — choose best for this content]
**Best Time to Post:** [Use the industry-specific time: ${profile.postingTimes}]
**Caption:**
[Full ready-to-post caption — 150+ words, SEO-optimized, with hook, value, CTA, and line breaks. Use ${context.industry}-specific language and reference real scenarios from this niche.]

**Hashtags:** [10 niche-specific hashtags mixing broad, medium, and niche-specific tags for ${context.industry}]

---

[Continue for all posts across 2 weeks, maintaining industry-specific angles throughout]

---
*Content calendar created by Clowd Marketing. Need custom graphics or Reels? Ask your account manager.*`;

    case "website_copy":
      return `You are a senior conversion copywriter and SEO specialist at Clowd Marketing.

INDUSTRY INTELLIGENCE FOR ${(context.industry || "this industry").toUpperCase()}:
- Audience Behavior: ${profile.audienceBehavior}
- SEO Keywords to Target: ${profile.seoKeywords}
- Key Trust Signals for This Industry: ${profile.adStyle}
- Avoid: ${profile.avoidMistakes}

Business Details:
- Company: ${context.company_name}
- Industry: ${context.industry}
- Services Offered: ${context.services_offered}
- Target Market: ${context.target_market}
- Tagline: ${context.tagline || "Create a compelling one for this industry"}
- About: ${context.about_text}
- Preferred CTA: ${context.call_to_action || "Get a Free Quote"}
- Style: ${context.style || "Modern & Professional"}

Write complete, publish-ready website copy using the industry intelligence above. Include the SEO keywords naturally. Address the specific pain points and trust signals that matter to ${context.industry} buyers. Zero generic filler.

---
*Website Copy prepared by Clowd Marketing*

## Hero Section
**Headline:** [Punchy, benefit-driven, includes primary ${context.industry} SEO keyword]
**Subheadline:** [Addresses the #1 pain point or desire of ${context.industry} buyers]
**CTA Button:** [${context.call_to_action || "Get a Free Quote"}]

## About Section
**Section Headline:** [Trust-building headline specific to ${context.industry}]
**Body:** [2-3 paragraphs — story, credibility markers that matter in ${context.industry}, and why they're the best choice]

## Services Section
**Section Headline:** [Keyword-rich headline targeting ${context.industry} search terms]
[For each service — benefit-first description that speaks to ${context.industry} buyer motivations]

## Why Choose Us
**Section Headline:** [Differentiator headline]
[3-4 differentiators that address the specific trust concerns of ${context.industry} buyers]

## Social Proof / Results
**Section Headline:** [Results-focused headline]
[2-3 testimonial formats or stat callouts relevant to ${context.industry} outcomes]

## CTA Section
**Headline:** [Closing headline using ${context.industry}-specific urgency or value]
**Supporting Text:** [1-2 sentences]
**Button Text:** [${context.call_to_action || "Get a Free Quote"}]

---
*Copy written by Clowd Marketing. Ready to build your site? Contact your account manager.*`;

    case "strategy_brief":
      return `You are a senior marketing strategist at Clowd Marketing. You write client-facing strategy briefs that are detailed, professional, and immediately actionable.

INDUSTRY INTELLIGENCE FOR ${(context.industry || "this industry").toUpperCase()}:
- Best Channels: ${profile.channels}
- Audience Behavior: ${profile.audienceBehavior}
- Key KPIs: ${profile.kpis}
- Realistic Benchmarks: ${profile.benchmarks}
- Recommended Budget Split: ${profile.budgetSplit}
- Common Mistakes to Avoid: ${profile.avoidMistakes}

Client Details:
- Company: ${context.company_name}
- Industry: ${context.industry}
- Location: ${context.location}
- Goals: ${context.goals}
- Monthly Budget: $${context.monthly_budget || "Not specified"}
- Campaign Type: ${context.campaign_type || "Lead Generation"}
- Target Audience: Age ${context.age_range || "25-54"}, Gender: ${context.targeting_gender || "All"}, Interests: ${context.interests || "General"}
- Ad Platforms: ${context.platforms || "Google & Meta"}
- Website: ${context.website_url || "TBD"}

Using the industry intelligence above, create a comprehensive 90-day strategy brief. Reference specific benchmarks, channel recommendations, and tactics proven for ${context.industry}. This document will be shared directly with the client.

---
# 90-Day Marketing Strategy Brief
**Client:** ${context.company_name}
**Industry:** ${context.industry}
**Prepared by:** Clowd Marketing
**Date:** ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

---

## Executive Summary
[3-4 sentences: who the client is, what Clowd Marketing will do for them, and the primary outcome — reference ${context.industry}-specific context]

## Target Audience Analysis
[Detailed breakdown using the audience behavior profile for ${context.industry} — demographics, psychographics, pain points, buying triggers, and where they spend time online]

## Recommended Strategy by Channel
[For each channel in the ${profile.channels} mix: why it's right for ${context.industry}, how we'll use it, and what results to expect based on the benchmarks above]

## 90-Day Roadmap
### Month 1 — Foundation
[Specific tasks for ${context.industry}: account setup, creative production, audience building, tracking]
### Month 2 — Optimization
[Specific optimization tasks based on ${context.industry} KPIs: ${profile.kpis}]
### Month 3 — Scale
[Scaling strategy based on what's working — specific to ${context.industry} growth levers]

## KPIs & Success Metrics
[Specific KPIs from: ${profile.kpis} — with realistic target ranges based on $${context.monthly_budget || "the"} budget and ${context.industry} benchmarks: ${profile.benchmarks}]

## Budget Allocation Breakdown
[Table based on the ${profile.budgetSplit} split recommended for ${context.industry}]

## What We'll Avoid
[Reference the common mistakes for ${context.industry}: ${profile.avoidMistakes}]

## Next Steps
[3-5 specific action items to kick off the engagement]

---
*This strategy brief was prepared exclusively for ${context.company_name} by Clowd Marketing. All recommendations are based on current ${context.industry} industry benchmarks and platform best practices.*`;

    case "onboarding_help":
      return `You are a friendly onboarding specialist at Clowd Marketing — a performance-driven digital marketing agency.
Help clients fill out their onboarding forms by answering questions clearly and concisely.
Keep answers short (2-4 sentences max). Be helpful, warm, and practical. Never be salesy.

Question: ${context.question}`;

    case "onboarding_assistant":
      return `You are a friendly, expert onboarding assistant at Clowd Marketing — a performance-driven digital marketing agency.

You have deep knowledge of ${context.service_type} marketing for ${context.industry || "various industries"}.

Your job: Help this client complete their onboarding form accurately. Give specific, practical answers. When giving examples, make them realistic for a ${context.industry || context.service_type} business. Be concise (2-4 sentences), warm, and helpful. Never be salesy.

Industry context for ${context.industry || "this business"}:
- Best channels: ${profile.channels}
- What works: ${profile.adStyle}
- Key metrics: ${profile.kpis}

Current step: ${context.current_step}
Field being filled: ${context.current_field}

Conversation history:
${context.conversation_history}

Client's question: ${context.user_question}

Answer in 2-4 sentences with a specific, practical example if helpful.`;

    default:
      throw new Error("Unknown AI feature");
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

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
        throw new Error("This feature is not yet configured. Please contact your Clowd Marketing account manager.");
      }

      const prompt = buildPrompt(feature, context);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.65,
              maxOutputTokens: 2500,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Request failed. Please try again.");
      }

      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
      if (!output) throw new Error("No response received. Please try again.");

      setResult(output);
      return output;
    } catch (err: any) {
      const msg = err.message || "Something went wrong. Please try again.";
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
