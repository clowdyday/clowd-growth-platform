import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { BarChart3, Globe, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import serviceAds from "@/assets/service-ads.png";
import serviceWebsite from "@/assets/service-website.png";
import serviceSocial from "@/assets/service-social.png";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const servicesData = [
  {
    icon: BarChart3,
    title: "Performance Ad Management",
    featured: true,
    image: serviceAds,
    description: "Our flagship service. Clowd Marketing builds, manages, and continuously optimizes ad campaigns that generate qualified leads and measurable revenue for your business.",
    details: [
      "Transparent pricing at 10% of your monthly ad spend",
      "Custom strategy tailored to your industry, audience, and goals",
      "Full campaign setup, creative direction, and targeting",
      "Ongoing A/B testing, optimization, and performance reporting",
      "Google Ads, Meta (Facebook & Instagram), and more",
      "Dedicated conversion tracking and attribution setup",
    ],
  },
  {
    icon: Globe,
    title: "Website Design & Development",
    featured: false,
    image: serviceWebsite,
    description: "High-converting, professionally designed websites built to represent your brand and turn visitors into customers. Every site is fast, mobile-first, and optimized for search.",
    details: [
      "Multiple packages: Starter ($1,000), Growth ($2,500), and Custom",
      "Conversion-focused design — built for results, not just aesthetics",
      "Fully responsive and optimized for mobile performance",
      "On-page SEO, trust signals, and strategic CTAs",
      "Ongoing management and content updates available",
      "Copy and messaging tailored to your brand and audience",
    ],
  },
  {
    icon: TrendingUp,
    title: "Organic Social Media Growth",
    featured: false,
    image: serviceSocial,
    description: "Build brand authority and a loyal audience through strategic, consistent organic social media content. Position your business as the go-to choice before customers even start searching.",
    details: [
      "Packages starting at $50/month",
      "Brand-aligned content strategy and editorial calendar",
      "Consistent posting schedule across your chosen platforms",
      "Community management and audience engagement",
      "Authority-building content that drives long-term trust",
      "Monthly performance reporting and growth tracking",
    ],
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Clowd Marketing Services",
  "description": "Performance marketing services by Clowd Marketing for service-based and e-commerce businesses",
  "url": "https://clowdmarketing.com/services",
  "itemListElement": servicesData.map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": s.title,
    "description": s.description,
  })),
};

const ServicesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Services — Performance Ad Management, Web Design & Social Media | Clowd Marketing</title>
        <meta name="description" content="Clowd Marketing offers performance ad management, website design, and organic social media growth for service-based and e-commerce businesses. See full service details and get started today." />
        <meta name="keywords" content="Clowd Marketing services, performance ad management, website design agency, social media marketing, digital marketing services, lead generation" />
        <link rel="canonical" href="https://clowdmarketing.com/services" />
        <meta property="og:title" content="Services — Clowd Marketing" />
        <meta property="og:description" content="Performance ad management, website design, and social media growth for ambitious businesses by Clowd Marketing." />
        <meta property="og:url" content="https://clowdmarketing.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Clowd Marketing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services — Clowd Marketing" />
        <meta name="twitter:description" content="Performance ad management, websites, and social media by Clowd Marketing." />
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Clowd Marketing Services</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
              Everything Your Business Needs to Grow
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ads, websites, and social media — managed by a team that understands performance marketing and is obsessed with delivering measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6 space-y-16">
          {servicesData.map((service, i) => (
            <motion.article
              key={service.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card overflow-hidden relative max-w-4xl mx-auto ${service.featured ? "ring-2 ring-accent/20" : ""}`}
            >
              {service.featured && (
                <span className="absolute top-6 right-6 z-10 text-[10px] font-bold tracking-wider uppercase bg-accent/20 text-accent px-3 py-1 rounded-full backdrop-blur-sm">
                  Core Service
                </span>
              )}
              <div className="h-56 overflow-hidden">
                <img src={service.image} alt={`${service.title} — Clowd Marketing`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 md:p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <service.icon className="w-7 h-7 text-accent" aria-hidden="true" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">{service.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                  {service.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button variant="cta" asChild>
                    <Link to="/pricing">View Pricing <ArrowRight className="ml-1" /></Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
            Ready to Start Growing with Clowd Marketing?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Select your services, get transparent pricing, and start scaling your business today.
          </p>
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/estimate">Get Your Free Strategy <ArrowRight className="ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
