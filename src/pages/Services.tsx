import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { BarChart3, Globe, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const servicesData = [
  {
    icon: BarChart3,
    title: "Ad Management",
    featured: true,
    description: "Our core service. We build, manage, and optimize ad campaigns that generate real leads for contractors.",
    details: [
      "Pricing is based on 10% of your monthly ad spend",
      "Custom strategy based on your budget, industry, and market",
      "Full campaign setup, targeting, and creative management",
      "Ongoing optimization and performance reporting",
      "Google Ads, Facebook Ads, and Instagram Ads",
      "Dedicated tracking and lead attribution",
    ],
  },
  {
    icon: Globe,
    title: "Website Creation & Management",
    featured: false,
    description: "Clean, modern, high-converting websites built specifically for blue-collar businesses. Every site is optimized for trust, speed, and mobile performance.",
    details: [
      "Multiple packages: Starter, Growth, and Custom",
      "Designed for conversion — not just aesthetics",
      "Mobile-responsive and fast-loading",
      "Built with trust signals, CTAs, and local SEO",
      "Ongoing management and updates available",
      "Content and copy tailored to your industry",
    ],
  },
  {
    icon: TrendingUp,
    title: "Organic Social Media Growth & Management",
    featured: false,
    description: "Build your brand and local authority through strategic organic social media. Position yourself as the contractor people trust before they even call.",
    details: [
      "Short-form content strategy and planning",
      "Educational and trust-building content",
      "Consistent posting schedules",
      "Account management and engagement",
      "Brand positioning for local authority",
      "Monthly reporting and growth tracking",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Our Services</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-5">
              Everything Contractors Need to Grow
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ads, websites, and social media — managed by a team that actually understands blue-collar businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6 space-y-16">
          {servicesData.map((service, i) => (
            <motion.div
              key={service.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 md:p-12 relative ${service.featured ? "ring-2 ring-accent/20" : ""}`}
            >
              {service.featured && (
                <span className="absolute top-6 right-6 text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">
                  Core Service
                </span>
              )}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{service.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-0 md:ml-[76px]">
                {service.details.map((detail) => (
                  <div key={detail} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 ml-0 md:ml-[76px]">
                <Button variant="cta" asChild>
                  <Link to="/pricing">View Pricing <ArrowRight className="ml-1" /></Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
            See What It Would Cost
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-8 max-w-xl mx-auto">
            Use our instant estimate calculator to get transparent pricing in under 60 seconds.
          </p>
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/estimate">Get Instant Estimate <ArrowRight className="ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
