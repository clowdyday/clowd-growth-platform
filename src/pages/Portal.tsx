import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import {
  ClipboardList, Upload, Eye, LayoutDashboard,
  FileText, BarChart3, ArrowRight, Shield,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const portalFeatures = [
  { icon: ClipboardList, title: "Complete Onboarding", desc: "Fill out structured forms with your business details, goals, and preferences." },
  { icon: Upload, title: "Upload Assets", desc: "Submit logos, photos, videos, and brand materials through a secure portal." },
  { icon: Eye, title: "View Your Strategy", desc: "Access your custom marketing plan with clear deliverables and timelines." },
  { icon: BarChart3, title: "Track Progress", desc: "Monitor campaign performance, deliverables, and project status in real time." },
  { icon: FileText, title: "See Deliverables", desc: "Review completed work, ad creatives, website drafts, and content." },
  { icon: Shield, title: "Stay Informed", desc: "Get updates and reports without constant phone calls or email chains." },
];

const PortalPage = () => (
  <div>
    <Helmet>
      <title>Client Portal — Marketing Dashboard | Clowd Marketing</title>
      <meta name="description" content="Access your Clowd Marketing client portal to onboard, upload assets, track progress, and view deliverables — all in one dashboard built for contractors." />
      <meta name="keywords" content="Clowd Marketing portal, ClowdMarketing dashboard, contractor marketing dashboard, client portal" />
      <link rel="canonical" href="https://clowdmarketing.com/portal" />
      <meta property="og:title" content="Client Portal — Clowd Marketing" />
      <meta property="og:description" content="Manage your marketing with Clowd Marketing's client portal — onboarding, assets, progress, and deliverables in one place." />
      <meta property="og:url" content="https://clowdmarketing.com/portal" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Clowd Marketing" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Client Portal — Clowd Marketing" />
      <meta name="twitter:description" content="Manage your contractor marketing with Clowd Marketing's client portal." />
    </Helmet>

    {/* Hero */}
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Clowd Marketing Client Portal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            Your Marketing. One Dashboard.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Onboard, upload assets, view your strategy, and track progress — all from a single Clowd Marketing dashboard built for contractors.
          </p>
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/auth">Create Your Account <ArrowRight className="ml-1" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Dashboard Preview */}
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="What You Get"
          title="Everything in One Place"
          description="No more chasing your marketing team for updates. Everything you need is in the Clowd Marketing portal."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portalFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-7 text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mock Dashboard */}
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Built for Contractors"
          title="Simple. Clear. No Learning Curve."
          description="We designed the Clowd Marketing portal for busy business owners, not tech teams. If you can use a phone, you can use this."
        />
        <motion.div {...fadeUp} className="glass-card p-6 md:p-10 max-w-4xl mx-auto glow-accent">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Active Campaigns", value: "3" },
              { label: "This Month's Leads", value: "47" },
              { label: "Assets Uploaded", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="bg-muted rounded-xl p-5 text-center">
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {["Website Draft Ready for Review", "Ad Campaign — Week 2 Report", "Social Content Calendar — March"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                  <LayoutDashboard className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                  <span className="ml-auto text-xs text-muted-foreground">View →</span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
          Ready to Get Started with Clowd Marketing?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Create your account, complete onboarding, and let's get your marketing running.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/auth">Create Account <ArrowRight className="ml-1" /></Link>
          </Button>
          <Button variant="hero-secondary" size="xl" asChild>
            <Link to="/estimate">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default PortalPage;