import type { OnboardingStepConfig } from "./OnboardingForm";

export const adsOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "business_details",
    label: "Business Details",
    desc: "Company name, industry, location, goals",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Apex Roofing LLC", required: true },
      {
        name: "industry",
        label: "Industry",
        type: "select",
        required: true,
        options: [
          { value: "roofing", label: "Roofing" },
          { value: "hvac", label: "HVAC" },
          { value: "plumbing", label: "Plumbing" },
          { value: "electrical", label: "Electrical" },
          { value: "landscaping", label: "Landscaping" },
          { value: "general_contractor", label: "General Contractor" },
          { value: "painting", label: "Painting" },
          { value: "remodeling", label: "Remodeling" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "location", label: "Service Location", type: "text", placeholder: "Dallas, TX", required: true },
      { name: "goals", label: "Primary Goals", type: "textarea", placeholder: "e.g. Generate 20+ leads per month, increase brand awareness..." },
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
          { value: "25-34", label: "25–34" },
          { value: "35-44", label: "35–44" },
          { value: "45-54", label: "45–54" },
          { value: "55-64", label: "55–64" },
          { value: "all_adults", label: "All Adults (25+)" },
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
      { name: "geo_targeting", label: "Geographic Targeting", type: "text", placeholder: "e.g. 25 mile radius around Dallas, TX" },
      { name: "interests", label: "Customer Interests / Keywords", type: "textarea", placeholder: "e.g. homeowners, home improvement, roof repair..." },
    ],
  },
  {
    key: "budget_strategy",
    label: "Budget & Strategy",
    desc: "Set your monthly ad budget and preferences",
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
        label: "Campaign Type",
        type: "select",
        options: [
          { value: "lead_gen", label: "Lead Generation" },
          { value: "brand_awareness", label: "Brand Awareness" },
          { value: "both", label: "Both" },
        ],
      },
      {
        name: "platforms",
        label: "Preferred Ad Platforms",
        type: "select",
        options: [
          { value: "google", label: "Google Ads" },
          { value: "facebook", label: "Facebook/Instagram" },
          { value: "both", label: "Both Google & Facebook" },
          { value: "unsure", label: "Not sure – recommend for me" },
        ],
      },
    ],
  },
  {
    key: "creative_assets",
    label: "Creative Assets",
    desc: "Share your branding materials",
    fields: [
      { name: "brand_colors", label: "Brand Colors", type: "text", placeholder: "e.g. Navy blue, white, gold" },
      { name: "logo_description", label: "Do you have a logo?", type: "select", options: [
        { value: "yes_uploaded", label: "Yes – I'll upload in Assets" },
        { value: "yes_send_later", label: "Yes – I'll send it later" },
        { value: "no", label: "No – I need one designed" },
      ]},
      { name: "existing_photos", label: "Do you have project photos?", type: "select", options: [
        { value: "yes", label: "Yes – I'll upload them" },
        { value: "some", label: "Some – I'll share what I have" },
        { value: "no", label: "No – please use stock photos" },
      ]},
      { name: "brand_notes", label: "Additional Branding Notes", type: "textarea", placeholder: "Anything else about your brand style..." },
    ],
  },
  {
    key: "tracking_setup",
    label: "Tracking Setup",
    desc: "Provide website and tracking info",
    fields: [
      { name: "website_url", label: "Website URL", type: "url", placeholder: "https://yoursite.com" },
      { name: "google_analytics", label: "Google Analytics ID (if any)", type: "text", placeholder: "UA-XXXXXXX or G-XXXXXXX" },
      { name: "facebook_pixel", label: "Facebook Pixel ID (if any)", type: "text", placeholder: "123456789" },
      { name: "tracking_notes", label: "Additional Notes", type: "textarea", placeholder: "Any other tracking or CRM details..." },
    ],
  },
];

export const websiteOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "business_info",
    label: "Business Information",
    desc: "Company details, services, and service areas",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Apex Roofing LLC", required: true },
      { name: "phone", label: "Business Phone", type: "tel", placeholder: "(555) 123-4567", required: true },
      { name: "email", label: "Business Email", type: "email", placeholder: "info@yourcompany.com", required: true },
      { name: "services_offered", label: "Services You Offer", type: "textarea", placeholder: "e.g. Roof repair, new installations, gutter cleaning...", required: true },
      { name: "service_areas", label: "Service Areas", type: "text", placeholder: "e.g. Dallas, Fort Worth, Arlington", required: true },
    ],
  },
  {
    key: "brand_assets",
    label: "Brand Assets",
    desc: "Logo, brand colors, and font preferences",
    fields: [
      { name: "logo_status", label: "Logo Status", type: "select", required: true, options: [
        { value: "have_logo", label: "I have a logo – I'll upload it" },
        { value: "need_logo", label: "I need a logo designed" },
      ]},
      { name: "brand_colors", label: "Brand Colors", type: "text", placeholder: "e.g. Blue, white, gray" },
      { name: "font_preference", label: "Font Style Preference", type: "select", options: [
        { value: "modern", label: "Modern & Clean" },
        { value: "bold", label: "Bold & Strong" },
        { value: "elegant", label: "Elegant & Professional" },
        { value: "no_preference", label: "No preference" },
      ]},
    ],
  },
  {
    key: "content_copy",
    label: "Content & Copy",
    desc: "Provide text, bios, testimonials, and key messaging",
    fields: [
      { name: "tagline", label: "Tagline / Slogan", type: "text", placeholder: "e.g. Building Trust, One Roof at a Time" },
      { name: "about_text", label: "About Your Company", type: "textarea", placeholder: "Tell us about your company, history, and what sets you apart...", required: true },
      { name: "testimonials", label: "Customer Testimonials", type: "textarea", placeholder: "Paste any customer reviews or testimonials you'd like featured..." },
      { name: "call_to_action", label: "Preferred Call-to-Action", type: "select", options: [
        { value: "call_now", label: "Call Now" },
        { value: "get_quote", label: "Get a Free Quote" },
        { value: "schedule", label: "Schedule a Consultation" },
        { value: "contact", label: "Contact Us" },
      ]},
    ],
  },
  {
    key: "design_preferences",
    label: "Design Preferences",
    desc: "Choose style direction and reference examples",
    fields: [
      { name: "style", label: "Website Style", type: "select", required: true, options: [
        { value: "modern_minimal", label: "Modern & Minimal" },
        { value: "bold_corporate", label: "Bold & Corporate" },
        { value: "warm_friendly", label: "Warm & Friendly" },
        { value: "dark_premium", label: "Dark & Premium" },
      ]},
      { name: "reference_sites", label: "Reference Websites (if any)", type: "textarea", placeholder: "Paste URLs of websites you like the look of..." },
      { name: "pages_needed", label: "Pages Needed", type: "select", required: true, options: [
        { value: "basic_5", label: "Basic (Home, About, Services, Gallery, Contact)" },
        { value: "standard_8", label: "Standard (Basic + Blog, Testimonials, FAQ)" },
        { value: "custom", label: "Custom – I'll describe below" },
      ]},
      { name: "custom_pages", label: "Custom Pages (if selected above)", type: "textarea", placeholder: "List any specific pages you need..." },
    ],
  },
  {
    key: "review_launch",
    label: "Review & Launch",
    desc: "Domain name and final details",
    fields: [
      { name: "domain_name", label: "Do you have a domain?", type: "select", required: true, options: [
        { value: "yes", label: "Yes – I own a domain" },
        { value: "need_help", label: "No – I need help getting one" },
      ]},
      { name: "domain_url", label: "Domain Name (if you have one)", type: "url", placeholder: "https://yourdomain.com" },
      { name: "launch_timeline", label: "Preferred Timeline", type: "select", options: [
        { value: "asap", label: "ASAP" },
        { value: "2_weeks", label: "Within 2 weeks" },
        { value: "1_month", label: "Within a month" },
        { value: "flexible", label: "Flexible" },
      ]},
      { name: "additional_notes", label: "Anything Else?", type: "textarea", placeholder: "Any other details or requirements..." },
    ],
  },
];

export const organicOnboardingSteps: OnboardingStepConfig[] = [
  {
    key: "brand_voice",
    label: "Brand Voice & Tone",
    desc: "Define how your brand should sound on social media",
    fields: [
      { name: "tone", label: "Brand Tone", type: "select", required: true, options: [
        { value: "professional", label: "Professional & Authoritative" },
        { value: "friendly", label: "Friendly & Approachable" },
        { value: "bold", label: "Bold & Confident" },
        { value: "casual", label: "Casual & Conversational" },
      ]},
      { name: "personality", label: "Brand Personality Traits", type: "text", placeholder: "e.g. Trustworthy, reliable, hardworking" },
      { name: "avoid", label: "Anything to Avoid?", type: "textarea", placeholder: "e.g. Humor, slang, political topics..." },
    ],
  },
  {
    key: "platforms",
    label: "Platform Selection",
    desc: "Choose which social platforms to focus on",
    fields: [
      { name: "primary_platform", label: "Primary Platform", type: "select", required: true, options: [
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "tiktok", label: "TikTok" },
        { value: "linkedin", label: "LinkedIn" },
      ]},
      { name: "secondary_platform", label: "Secondary Platform (optional)", type: "select", options: [
        { value: "none", label: "None" },
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "tiktok", label: "TikTok" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "youtube", label: "YouTube" },
      ]},
      { name: "existing_handles", label: "Existing Social Media Handles", type: "textarea", placeholder: "e.g. Instagram: @yourcompany, Facebook: facebook.com/yourcompany" },
    ],
  },
  {
    key: "content_pillars",
    label: "Content Pillars",
    desc: "Define key topics and themes for your content",
    fields: [
      { name: "topics", label: "Key Topics / Themes", type: "textarea", placeholder: "e.g. Before/after projects, tips for homeowners, team highlights, behind the scenes...", required: true },
      { name: "hashtags", label: "Preferred Hashtags", type: "text", placeholder: "e.g. #DallasRoofing #RoofRepair #HomeImprovement" },
      { name: "competitors", label: "Competitors to Monitor", type: "textarea", placeholder: "List competitor social accounts you'd like us to keep an eye on..." },
    ],
  },
  {
    key: "visual_assets",
    label: "Visual Assets",
    desc: "Share project photos, team photos, and brand materials",
    fields: [
      { name: "photo_availability", label: "Photo Availability", type: "select", required: true, options: [
        { value: "lots", label: "I have lots of project photos" },
        { value: "some", label: "I have some photos to share" },
        { value: "few", label: "I have very few photos" },
        { value: "none", label: "I need help creating content" },
      ]},
      { name: "video_content", label: "Do you have video content?", type: "select", options: [
        { value: "yes", label: "Yes – I can provide videos" },
        { value: "can_shoot", label: "No, but I can shoot some" },
        { value: "no", label: "No – I need guidance" },
      ]},
      { name: "visual_notes", label: "Additional Notes", type: "textarea", placeholder: "Any preferences for visual style, filters, etc." },
    ],
  },
  {
    key: "posting_schedule",
    label: "Posting Schedule",
    desc: "Set your preferred posting frequency and times",
    fields: [
      { name: "frequency", label: "Posting Frequency", type: "select", required: true, options: [
        { value: "3_week", label: "3x per week" },
        { value: "5_week", label: "5x per week (daily weekdays)" },
        { value: "7_week", label: "Daily" },
        { value: "custom", label: "Custom – I'll specify" },
      ]},
      { name: "best_times", label: "Best Times to Post", type: "select", options: [
        { value: "morning", label: "Morning (7-10 AM)" },
        { value: "midday", label: "Midday (11 AM-2 PM)" },
        { value: "evening", label: "Evening (5-8 PM)" },
        { value: "let_you_decide", label: "Let the team decide" },
      ]},
      { name: "schedule_notes", label: "Scheduling Notes", type: "textarea", placeholder: "Any blackout dates, seasonal considerations, etc." },
    ],
  },
];
