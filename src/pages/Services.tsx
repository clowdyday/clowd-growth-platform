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
    title: "Ad Management",
    featured: true,
    image: serviceAds,
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
    image: serviceWebsite,
    description: "Clean, modern, high-converting websites built specifically for blue-collar businesses. Every site is optimized for trust, speed, and mobile performance.",
    details: [
      "Multiple packages: Starter ($1,000), Growth ($2,500), and Custom",
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
    image: serviceSocial,
    description: "Build your brand and local authority through strategic organic social media. Position yourself as the contractor people trust before they even call.",
    details: [
      "Packages starting at $50/month",
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
      <Helmet>
        <title>Services — Ad Management, Websites & Social Media | Clowd Marketing</title>
        <meta name="description" content="Clowd Marketing offers ad management, website creation, and organic social media growth for contractors. See our full service details and start today." />
        <link rel="canonical" href="https://clowdmarketing.com/services" />
      </Helmet>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Our Services</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
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
            <motion.article
              key={service.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card overflow-hidden relative ${service.featured ? "ring-2 ring-accent/20" : ""}`}
            >
              {service.featured && (
                <span className="absolute top-6 right-6 z-10 text-[10px] font-bold tracking-wider uppercase bg-accent/20 text-accent px-3 py-1 rounded-full backdrop-blur-sm">
                  Core Service
                </span>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 h-48 lg:h-auto overflow-hidden">
                  <img src={service.image} alt={`${service.title} for contractors`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="lg:col-span-3 p-8 md:p-12">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-7 h-7 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{service.title}</h2>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">{service.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Select your services, get transparent pricing, and start growing your business today.
          </p>
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/estimate">Get Started <ArrowRight className="ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
