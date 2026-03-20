import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceAds from "@/assets/service-ads.png";
import serviceWebsite from "@/assets/service-website.png";
import serviceSocial from "@/assets/service-social.png";
import {
  BarChart3, Globe, TrendingUp, ClipboardList, Lightbulb,
  Upload, LayoutDashboard, Zap, Eye, Layers,
  MessageSquare, ArrowRight, Star, Target, ShoppingBag,
  Briefcase, Store, Building2, Cpu, HeartPulse, GraduationCap
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const services = [
  {
    icon: BarChart3,
    title: "Performance Ad Management",
    description: "Data-driven ad campaigns across Google, Meta, and beyond. We manage strategy, targeting, creative, and optimization so every dollar delivers measurable ROI.",
    featured: true,
    image: serviceAds,
  },
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Fast, conversion-focused websites built to turn visitors into customers. Mobile-first, SEO-ready, and designed to reflect your brand at its best.",
    image: serviceWebsite,
  },
  {
    icon: TrendingUp,
    title: "Organic Social Media Growth",
    description: "Build authority and trust through strategic content. Consistent, brand-aligned posts that grow your audience and keep your business top of mind.",
    image: serviceSocial,
  },
];

const steps = [
  { icon: ClipboardList, title: "Share Your Goals", desc: "Tell us your industry, target audience, budget, and growth objectives." },
  { icon: Lightbulb, title: "Receive a Custom Strategy", desc: "Get a tailored plan with clear deliverables, timelines, and transparent pricing." },
  { icon: Upload, title: "Onboard in Minutes", desc: "Submit your brand assets and details through your dedicated client portal." },
  { icon: LayoutDashboard, title: "Track Real Results", desc: "Monitor campaign performance, deliverables, and progress in real time." },
];

const industries = [
  { icon: ShoppingBag, label: "E-Commerce" },
  { icon: HeartPulse, label: "Health & Wellness" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Store, label: "Retail & Local" },
  { icon: Building2, label: "Real Estate" },
  { icon: Cpu, label: "SaaS & Tech" },
  { icon: GraduationCap, label: "Education" },
  { icon: Target, label: "Lead Generation" },
];

const differentiators = [
  { icon: Zap, title: "Automated Onboarding", desc: "No back-and-forth. Clients onboard through a structured, self-serve portal in minutes." },
  { icon: Eye, title: "Full Transparency", desc: "Track project progress, deliverables, and campaign performance in real time." },
  { icon: MessageSquare, title: "Centralized Communication", desc: "Strategy, assets, timelines, and updates — all in one organized place." },
  { icon: Layers, title: "Built to Scale", desc: "Systemized processes designed to grow with you, whether you have 5 clients or 500." },
];

const testimonials = [
  { name: "Alex R.", company: "Apex Digital", text: "Clowd transformed our lead generation. The dashboard alone saves us hours every week and the ROI is undeniable.", rating: 5 },
  { name: "Sarah T.", company: "Luminary Health Co.", text: "Finally a marketing team that gets results. No fluff, no vague promises — just data-backed strategy and execution.", rating: 5 },
  { name: "James L.", company: "ProScale Commerce", text: "The estimate calculator sold me instantly. Transparent pricing, fast onboarding, and real results from week one.", rating: 5 },
];

const stats = [
  { value: "3.2x", label: "Average ROI for clients" },
  { value: "48h", label: "Average onboarding time" },
  { value: "94%", label: "Client retention rate" },
  { value: "$12M+", label: "Ad spend managed" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Clowd Marketing",
  "alternateName": ["ClowdMarketing", "Clowd"],
  "description": "Clowd Marketing is a performance-driven digital marketing agency offering ad management, website design, and organic social media growth for service-based and e-commerce businesses.",
  "url": "https://clowdmarketing.com",
  "logo": "https://clowdmarketing.com/favicon.png",
  "image": "https://clowdmarketing.com/favicon.png",
  "serviceType": ["Ad Management", "Website Design", "Social Media Management", "Performance Marketing", "Digital Marketing"],
  "areaServed": { "@type": "Country", "name": "United States" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Service-based businesses, e-commerce brands, SaaS companies, local businesses, professional services"
  },
  "knowsAbout": ["Digital Marketing", "Google Ads", "Facebook Ads", "Instagram Ads", "Website Design", "Social Media Marketing", "Lead Generation", "Marketing Automation"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3",
    "bestRating": "5"
  },
};

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Clowd Marketing — Performance-Driven Digital Marketing Agency</title>
        <meta name="description" content="Clowd Marketing helps service-based and e-commerce businesses scale through performance ad management, website design, and organic social media. Transparent pricing — get started in 60 seconds." />
        <meta name="keywords" content="Clowd Marketing, ClowdMarketing, digital marketing agency, performance marketing, ad management, website design, social media marketing, lead generation" />
        <link rel="canonical" href="https://clowdmarketing.com" />
        <meta property="og:title" content="Clowd Marketing — Performance-Driven Digital Marketing" />
        <meta property="og:description" content="Clowd Marketing: ads, websites, and social media for businesses that demand measurable results. Transparent pricing and a custom strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clowdmarketing.com" />
        <meta property="og:site_name" content="Clowd Marketing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clowd Marketing — Performance-Driven Digital Marketing" />
        <meta name="twitter:description" content="Clowd Marketing: ad management, websites, and social media built for measurable business growth." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Performance-Driven Digital Marketing
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Scale Faster with{" "}
              <span className="text-gradient">Marketing That Performs.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Clowd Marketing builds and manages ads, websites, and social media for service-based and e-commerce businesses.
              Strategy, execution, and measurable ROI — without the agency runaround.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/estimate">Get Your Free Strategy <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass-card p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding" aria-labelledby="services-heading">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="What We Do"
            title="Three Services. One Growth System."
            description="Everything your business needs to get found, generate leads, and scale — managed by one expert team obsessed with measurable results."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card-hover overflow-hidden relative ${
                  service.featured ? "ring-2 ring-accent/20" : ""
                }`}
              >
                <div className="h-44 overflow-hidden">
                  <img src={service.image} alt={`${service.title} — Clowd Marketing`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-8 text-center">
                  {service.featured && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase bg-accent/20 text-accent px-3 py-1 rounded-full backdrop-blur-sm">
                      Core Service
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <service.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="cta-outline" asChild>
              <Link to="/services">Explore All Services <ArrowRight className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/30" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="How It Works"
            title="From Signup to Results in 4 Steps"
            description="No lengthy discovery calls. No confusing proposals. Just a clear, structured path from here to measurable growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-accent" aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-accent mb-2">Step {i + 1}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding" aria-labelledby="industries-heading">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="Who We Help"
            title="Built for Ambitious Businesses"
            description="Clowd Marketing works with service-based companies, e-commerce brands, and growth-focused businesses across every industry."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-5 text-center"
              >
                <ind.icon className="w-7 h-7 text-secondary mx-auto mb-3" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding bg-muted/30" aria-labelledby="why-clowd-heading">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="Why Clowd Marketing"
            title="The Agency Built for Results, Not Retainers"
            description="We built Clowd Marketing to eliminate the friction, opacity, and wasted spend that defines the traditional agency model."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover p-7 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <d.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="Client Results"
            title="Trusted by Growth-Focused Businesses"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-7"
              >
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
                <footer>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
              Ready to Scale Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Get a transparent strategy and estimate from Clowd Marketing in 60 seconds. No calls, no pressure, no long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/estimate">Get Your Free Strategy <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
