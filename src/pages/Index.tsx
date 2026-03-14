import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import {
  BarChart3, Globe, TrendingUp, ClipboardList, Lightbulb,
  Upload, LayoutDashboard, Wrench, Zap, Thermometer,
  Droplets, Plug, Building2, TreePine, HardHat, Sun,
  ShieldCheck, MessageSquare, Eye, Layers, ArrowRight, Star
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
    title: "Ad Management",
    description: "Strategic ad campaigns that generate qualified leads. We manage your budget, targeting, and optimization so every dollar works harder.",
    featured: true,
  },
  {
    icon: Globe,
    title: "Website Creation & Management",
    description: "Clean, fast, conversion-focused websites built specifically for contractors. Mobile-ready, trustworthy, and designed to turn visitors into calls.",
  },
  {
    icon: TrendingUp,
    title: "Organic Social Media Growth",
    description: "Build local authority through strategic social content. Educational posts, project showcases, and trust-building content that positions you as the go-to.",
  },
];

const steps = [
  { icon: ClipboardList, title: "Enter Business Details", desc: "Tell us your industry, location, budget, and goals." },
  { icon: Lightbulb, title: "Get a Custom Strategy", desc: "Receive a tailored plan with clear pricing and deliverables." },
  { icon: Upload, title: "Upload Assets & Onboard", desc: "Submit logos, photos, and info through your portal." },
  { icon: LayoutDashboard, title: "Track Progress", desc: "Monitor results, view deliverables, and stay informed." },
];

const industries = [
  { icon: HardHat, label: "Roofing" },
  { icon: Thermometer, label: "HVAC" },
  { icon: Droplets, label: "Plumbing" },
  { icon: Plug, label: "Electrical" },
  { icon: Building2, label: "Concrete" },
  { icon: TreePine, label: "Landscaping" },
  { icon: Wrench, label: "Construction" },
  { icon: Sun, label: "Solar" },
];

const differentiators = [
  { icon: Zap, title: "Automated Intake", desc: "No back-and-forth. Clients onboard through a structured, self-serve portal." },
  { icon: Eye, title: "Full Visibility", desc: "Track project progress, deliverables, and performance in real time." },
  { icon: MessageSquare, title: "Less Communication Overhead", desc: "Everything documented. Strategy, assets, timelines — all in one place." },
  { icon: Layers, title: "Built for Scale", desc: "Systemized processes that work whether you have 5 clients or 500." },
];

const testimonials = [
  { name: "Mike R.", company: "Apex Roofing", text: "Clowd changed how we get leads. The dashboard alone saves us hours every week.", rating: 5 },
  { name: "Sarah T.", company: "Comfort Air HVAC", text: "Finally a marketing team that understands contractors. No fluff, just results.", rating: 5 },
  { name: "James L.", company: "ProLine Plumbing", text: "The estimate calculator sold me instantly. Transparent pricing and fast onboarding.", rating: 5 },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Abstract cloud layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-glow blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Marketing Systems for Contractors
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary leading-[1.1] mb-6">
              More Leads. Better Visibility.{" "}
              <span className="text-gradient">Less Hassle.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Ads, websites, and social media built for blue-collar businesses.
              Get strategy, pricing, and onboarding — without wasting time on sales calls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/estimate">Get Instant Estimate <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/portal">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="What We Do"
            title="Three Services. One System."
            description="Everything a contractor needs to get found, get leads, and grow — managed under one roof."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card-hover p-8 relative ${
                  service.featured ? "ring-2 ring-accent/20" : ""
                }`}
              >
                {service.featured && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">
                    Core Service
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="How It Works"
            title="From Signup to Results in 4 Steps"
            description="No long discovery calls. No confusing proposals. Just a clear path from here to growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-bold text-accent mb-2">Step {i + 1}</div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="Who We Help"
            title="Built for Blue-Collar Businesses"
            description="We specialize in marketing for local service companies. If you work with your hands, we know how to get you leads."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-5 text-center"
              >
                <ind.icon className="w-7 h-7 text-secondary mx-auto mb-3" />
                <span className="text-sm font-semibold text-primary">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="Why Clowd"
            title="Marketing Without the Runaround"
            description="We built Clowd to eliminate the friction contractors face with traditional agencies."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover p-7 flex gap-5"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <d.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-primary mb-1">{d.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            label="What Clients Say"
            title="Trusted by Contractors"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-7"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-primary text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative text-center">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
              Ready to Grow Your Business?
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-10">
              Get a transparent estimate in 60 seconds. No calls, no pressure, no contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/estimate">Get Instant Estimate <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button size="xl" className="border-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/portal">Create Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
