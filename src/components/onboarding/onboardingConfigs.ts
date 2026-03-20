import type { OnboardingStepConfig } from "./OnboardingForm";

export const adsOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "business_details",
    label: "Business Details",
    desc: "Company name, industry, location, and goals",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company Name", required: true },
      {
        name: "industry",
        label: "Industry",
        type: "select",
        required: true,
        options: [
          { value: "ecommerce", label: "E-Commerce" },
          { value: "health_wellness", label: "Health & Wellness" },
          { value: "professional_services", label: "Professional Services" },
          { value: "real_estate", label: "Real Estate" },
          { value: "saas_tech", label: "SaaS / Technology" },
          { value: "retail_local", label: "Retail & Local Business" },
          { value: "education_coaching", label: "Education & Coaching" },
          { value: "home_services", label: "Home Services" },
          { value: "hospitality_food", label: "Hospitality & Food" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "location", label: "Business Location", type: "text", placeholder: "City, State or Country", required: true },
      { name: "goals", label: "Primary Marketing Goals", type: "textarea", placeholder: "e.g. Generate 20+ qualified leads per month, increase online sales, grow brand awareness..." },
    ],
  },
  {
    key: "target_audience",
    label: "Target Audience",
    desc: "Define your ideal customer profile",
    fields: [
      {
        name: "age_range",
        label: "Target Age Range",
        type: "select",
        options: [
          { value: "18-24", label: "18–24" },
          { value: "25-34", label: "25–34" },
          { value: "35-44", label: "35–44" },
          { value: "45-54", label: "45–54" },
          { value: "55-64", label: "55–64" },
          { value: "all_adults", label: "All Adults (18+)" },
        ],
      },
      {
        name: "targeting_gender",
        label: "Target Gender",
        type: "select",
        options: [
          { value: "all", label: "All" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        name: "customer_type",
        label: "Customer Type",
        type: "select",
        options: [
          { value: "b2c", label: "B2C — Selling to consumers" },
          { value: "b2b", label: "B2B — Selling to businesses" },
          { value: "both", label: "Both B2C and B2B" },
        ],
      },
      { name: "geo_targeting", label: "Geographic Targeting", type: "text", placeholder: "e.g. United States, 25-mile radius around Chicago, IL" },
      { name: "interests", label: "Customer Interests / Keywords", type: "textarea", placeholder: "e.g. online shopping, fitness, business software, productivity tools, fashion..." },
    ],
  },
  {
    key: "budget_strategy",
    label: "Budget & Strategy",
    desc: "Set your monthly ad budget and campaign preferences",
    fields: [
      {
        name: "monthly_budget",
        label: "Monthly Ad Budget",
        type: "select",
        required: true,
        options: [
          { value: "500", label: "$500/mo" },
          { value: "1000", label: "$1,000/mo" },
          { value: "2000", label: "$2,000/mo" },
          { value: "3000", label: "$3,000/mo" },
          { value: "5000", label: "$5,000/mo" },
          { value: "10000", label: "$10,000+/mo" },
        ],
      },
      {
        name: "campaign_type",
        label: "Campaign Objective",
        type: "select",
        options: [
          { value: "lead_gen", label: "Lead Generation" },
          { value: "sales_ecommerce", label: "Sales / E-Commerce" },
          { value: "brand_awareness", label: "Brand Awareness" },
          { value: "app_installs", label: "App Installs" },
          { value: "both", label: "Multiple Objectives" },
        ],
      },
      {
        name: "platforms",
        label: "Preferred Ad Platforms",
        type: "select",
        options: [
          { value: "google", label: "Google Ads" },
          { value: "meta", label: "Meta (Facebook & Instagram)" },
          { value: "both", label: "Both Google & Meta" },
          { value: "unsure", label: "Not sure — recommend for me" },
        ],
      },
    ],
  },
  {
    key: "creative_assets",
    label: "Creative Assets",
    desc: "Share your branding materials and creative preferences",
    fields: [
      { name: "brand_colors", label: "Brand Colors", type: "text", placeholder: "e.g. Navy blue, white, gold" },
      {
        name: "logo_status",
        label: "Do you have a logo?",
        type: "select",
        options: [
          { value: "yes_uploaded", label: "Yes — I'll upload it in Assets" },
          { value: "yes_send_later", label: "Yes — I'll send it later" },
          { value: "no", label: "No — I need one designed" },
        ],
      },
      {
        name: "existing_media",
        label: "Do you have brand photos or videos?",
        type: "select",
        options: [
          { value: "yes", label: "Yes — I'll upload them" },
          { value: "some", label: "Some — I'll share what I have" },
          { value: "no", label: "No — please use stock or create content" },
        ],
      },
      { name: "brand_notes", label: "Additional Branding Notes", type: "textarea", placeholder: "Anything else about your brand style, tone, or visual preferences..." },
    ],
  },
  {
    key: "tracking_setup",
    label: "Tracking & Analytics",
    desc: "Provide website and tracking details for campaign setup",
    fields: [
      { name: "website_url", label: "Website URL", type: "url", placeholder: "https://yoursite.com" },
      { name: "google_analytics", label: "Google Analytics ID (if any)", type: "text", placeholder: "UA-XXXXXXX or G-XXXXXXX" },
      { name: "facebook_pixel", label: "Meta Pixel ID (if any)", type: "text", placeholder: "123456789" },
      { name: "conversion_action", label: "Primary Conversion Action", type: "text", placeholder: "e.g. Form submission, purchase, phone call, demo booking" },
      { name: "tracking_notes", label: "Additional Notes", type: "textarea", placeholder: "Any other tracking, CRM, or attribution details..." },
    ],
  },
];

export const websiteOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "business_info",
    label: "Business Information",
    desc: "Company details, services, and target market",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company Name", required: true },
      { name: "phone", label: "Business Phone", type: "tel", placeholder: "(555) 123-4567", required: true },
      { name: "email", label: "Business Email", type: "email", placeholder: "info@yourcompany.com", required: true },
      { name: "services_offered", label: "Products / Services You Offer", type: "textarea", placeholder: "Describe what you sell or the services you provide...", required: true },
      { name: "target_market", label: "Target Market / Audience", type: "text", placeholder: "e.g. Small business owners, health-conscious consumers, enterprise SaaS buyers", required: true },
    ],
  },
  {
    key: "brand_assets",
    label: "Brand Assets",
    desc: "Logo, brand colors, and visual preferences",
    fields: [
      {
        name: "logo_status",
        label: "Logo Status",
        type: "select",
        required: true,
        options: [
          { value: "have_logo", label: "I have a logo — I'll upload it" },
          { value: "need_logo", label: "I need a logo designed" },
        ],
      },
      { name: "brand_colors", label: "Brand Colors", type: "text", placeholder: "e.g. Navy blue, white, gray" },
      {
        name: "font_preference",
        label: "Font Style Preference",
        type: "select",
        options: [
          { value: "modern", label: "Modern & Clean" },
          { value: "bold", label: "Bold & Strong" },
          { value: "elegant", label: "Elegant & Professional" },
          { value: "friendly", label: "Friendly & Approachable" },
          { value: "no_preference", label: "No preference — team decides" },
        ],
      },
    ],
  },
  {
    key: "content_copy",
    label: "Content & Copy",
    desc: "Provide text, messaging, testimonials, and CTAs",
    fields: [
      { name: "tagline", label: "Tagline / Value Proposition", type: "text", placeholder: "e.g. Marketing that drives measurable results" },
      { name: "about_text", label: "About Your Company", type: "textarea", placeholder: "Tell us about your company, mission, and what sets you apart from competitors...", required: true },
      { name: "testimonials", label: "Customer Testimonials", type: "textarea", placeholder: "Paste any customer reviews or testimonials you'd like featured on the site..." },
      {
        name: "call_to_action",
        label: "Preferred Call-to-Action",
        type: "select",
        options: [
          { value: "get_quote", label: "Get a Free Quote" },
          { value: "book_demo", label: "Book a Demo" },
          { value: "schedule", label: "Schedule a Consultation" },
          { value: "shop_now", label: "Shop Now" },
          { value: "contact", label: "Contact Us" },
          { value: "get_started", label: "Get Started" },
        ],
      },
    ],
  },
  {
    key: "design_preferences",
    label: "Design Preferences",
    desc: "Choose style direction and provide reference examples",
    fields: [
      {
        name: "style",
        label: "Website Style",
        type: "select",
        required: true,
        options: [
          { value: "modern_minimal", label: "Modern & Minimal" },
          { value: "bold_corporate", label: "Bold & Corporate" },
          { value: "warm_friendly", label: "Warm & Friendly" },
          { value: "dark_premium", label: "Dark & Premium" },
          { value: "tech_forward", label: "Tech-Forward & Clean" },
        ],
      },
      { name: "reference_sites", label: "Reference Websites (if any)", type: "textarea", placeholder: "Paste URLs of websites you like the look or feel of..." },
      {
        name: "pages_needed",
        label: "Pages Needed",
        type: "select",
        required: true,
        options: [
          { value: "basic_5", label: "Basic (Home, About, Services, Contact, FAQ)" },
          { value: "standard_8", label: "Standard (Basic + Blog, Testimonials, Pricing)" },
          { value: "custom", label: "Custom — I'll describe below" },
        ],
      },
      { name: "custom_pages", label: "Custom Pages (if selected above)", type: "textarea", placeholder: "List any specific pages or sections you need..." },
    ],
  },
  {
    key: "review_launch",
    label: "Review & Launch",
    desc: "Domain, hosting, and final details",
    fields: [
      {
        name: "domain_name",
        label: "Do you have a domain?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes — I own a domain" },
          { value: "need_help", label: "No — I need help getting one" },
        ],
      },
      { name: "domain_url", label: "Domain Name (if you have one)", type: "url", placeholder: "https://yourdomain.com" },
      {
        name: "launch_timeline",
        label: "Preferred Launch Timeline",
        type: "select",
        options: [
          { value: "asap", label: "ASAP" },
          { value: "2_weeks", label: "Within 2 weeks" },
          { value: "1_month", label: "Within a month" },
          { value: "flexible", label: "Flexible" },
        ],
      },
      { name: "additional_notes", label: "Anything Else?", type: "textarea", placeholder: "Any other requirements, integrations, or special requests..." },
    ],
  },
];

export const organicOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "brand_voice",
    label: "Brand Voice & Tone",
    desc: "Define how your brand should sound on social media",
    fields: [
      {
        name: "tone",
        label: "Brand Tone",
        type: "select",
        required: true,
        options: [
          { value: "professional", label: "Professional & Authoritative" },
          { value: "friendly", label: "Friendly & Approachable" },
          { value: "bold", label: "Bold & Confident" },
          { value: "casual", label: "Casual & Conversational" },
          { value: "inspirational", label: "Inspirational & Motivating" },
        ],
      },
      { name: "personality", label: "Brand Personality Traits", type: "text", placeholder: "e.g. Trustworthy, innovative, results-driven, approachable" },
      { name: "avoid", label: "Anything to Avoid?", type: "textarea", placeholder: "e.g. Humor, slang, political topics, competitor mentions..." },
    ],
  },
  {
    key: "platforms",
    label: "Platform Selection",
    desc: "Choose which social platforms to focus on",
    fields: [
      {
        name: "primary_platform",
        label: "Primary Platform",
        type: "select",
        required: true,
        options: [
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" },
          { value: "twitter_x", label: "X (Twitter)" },
        ],
      },
      {
        name: "secondary_platform",
        label: "Secondary Platform (optional)",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" },
          { value: "twitter_x", label: "X (Twitter)" },
          { value: "youtube", label: "YouTube" },
          { value: "pinterest", label: "Pinterest" },
        ],
      },
      { name: "existing_handles", label: "Existing Social Media Handles", type: "textarea", placeholder: "e.g. Instagram: @yourcompany, LinkedIn: linkedin.com/company/yourcompany" },
    ],
  },
  {
    key: "content_pillars",
    label: "Content Pillars",
    desc: "Define key topics and themes for your content strategy",
    fields: [
      { name: "topics", label: "Key Topics / Themes", type: "textarea", placeholder: "e.g. Industry insights, client success stories, behind the scenes, tips and tutorials, product showcases...", required: true },
      { name: "hashtags", label: "Preferred Hashtags", type: "text", placeholder: "e.g. #DigitalMarketing #BusinessGrowth #YourIndustry" },
      { name: "competitors", label: "Competitors to Monitor", type: "textarea", placeholder: "List competitor social accounts you'd like us to keep an eye on..." },
    ],
  },
  {
    key: "visual_assets",
    label: "Visual Assets",
    desc: "Share brand photos, videos, and visual materials",
    fields: [
      {
        name: "photo_availability",
        label: "Photo / Media Availability",
        type: "select",
        required: true,
        options: [
          { value: "lots", label: "I have lots of brand photos and media" },
          { value: "some", label: "I have some photos to share" },
          { value: "few", label: "I have very few photos" },
          { value: "none", label: "I need help creating visual content" },
        ],
      },
      {
        name: "video_content",
        label: "Do you have video content?",
        type: "select",
        options: [
          { value: "yes", label: "Yes — I can provide videos" },
          { value: "can_shoot", label: "No, but I can record some" },
          { value: "no", label: "No — I need guidance on this" },
        ],
      },
      { name: "visual_notes", label: "Additional Notes", type: "textarea", placeholder: "Any preferences for visual style, filters, color treatment, etc." },
    ],
  },
  {
    key: "posting_schedule",
    label: "Posting Schedule",
    desc: "Set your preferred posting frequency and timing",
    fields: [
      {
        name: "frequency",
        label: "Posting Frequency",
        type: "select",
        required: true,
        options: [
          { value: "3_week", label: "3x per week" },
          { value: "5_week", label: "5x per week (daily weekdays)" },
          { value: "7_week", label: "Daily" },
          { value: "custom", label: "Custom — I'll specify below" },
        ],
      },
      {
        name: "best_times",
        label: "Best Times to Post",
        type: "select",
        options: [
          { value: "morning", label: "Morning (7–10 AM)" },
          { value: "midday", label: "Midday (11 AM–2 PM)" },
          { value: "evening", label: "Evening (5–8 PM)" },
          { value: "let_you_decide", label: "Let the team decide based on analytics" },
        ],
      },
      { name: "schedule_notes", label: "Scheduling Notes", type: "textarea", placeholder: "Any blackout dates, seasonal campaigns, or special considerations..." },
    ],
  },
];
