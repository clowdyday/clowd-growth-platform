import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Cog, TrendingUp } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const values = [
  {
    icon: Target,
    title: "Results Over Retainers",
    desc: "Every campaign, website, and post is designed with one goal: measurable growth. We succeed when you succeed — that's how we build long-term partnerships.",
  },
  {
    icon: Cog,
    title: "Systemized Delivery",
    desc: "Every client goes through the same proven process — structured onboarding, clear timelines, and real deliverables. No surprises, no delays.",
  },
  {
    icon: Users,
    title: "Built for Real Businesses",
    desc: "We work with service-based companies, e-commerce brands, and growth-focused businesses across every industry. If you're serious about scaling, we're your team.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Strategy",
    desc: "We don't guess. Every decision is backed by data — from audience targeting to creative testing to budget allocation. Strategy informed by performance.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Clowd Marketing",
  "description": "Learn about Clowd Marketing — a performance-driven digital marketing agency offering ad management, website design, and organic social media growth for service-based and e-commerce businesses.",
  "url": "https://clowdmarketing.com/about",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Clowd Marketing",
    "url": "https://clowdmarketing.com"
  }
};

const AboutPage = () => (
  <div>
    <Helmet>
      <title>About Clowd Marketing — Performance-Driven Digital Marketing Agency</title>
      <meta name="description" content="Clowd Marketing is a performance-driven digital marketing agency specializing in ad management, website design, and social media growth for service-based and e-commerce businesses." />
      <meta name="keywords" content="about Clowd Marketing, ClowdMarketing, digital marketing agency, performance marketing, who is Clowd Marketing" />
      <link rel="canonical" href="https://clowdmarketing.com/about" />
      <meta property="og:title" content="About Clowd Marketing — Performance-Driven Digital Marketing Agency" />
      <meta property="og:description" content="Learn about Clowd Marketing and why ambitious businesses trust us for ads, websites, and social media." />
      <meta property="og:url" content="https://clowdmarketing.com/about" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Clowd Marketing" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Clowd Marketing" />
      <meta name="twitter:description" content="Learn about Clowd Marketing and why ambitious businesses trust us for performance marketing." />
      <script type="application/ld+json">{JSON.stringify(aboutJsonLd)}</script>
    </Helmet>

    {/* Hero */}
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">About Clowd Marketing</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            We Build Marketing Systems That Scale.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Clowd Marketing exists because most agencies overpromise, underdeliver, and keep clients in the dark.
            We built a better model — transparent, systemized, and obsessively focused on measurable results.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
              Marketing That Actually Moves the Needle
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Businesses don't need a 40-slide deck explaining "brand synergy." They need qualified leads,
                a professional online presence, and a marketing partner who treats their budget like their own.
              </p>
              <p>
                That's what Clowd Marketing delivers. Our team specializes in performance ad campaigns,
                conversion-focused websites, and strategic social media content for service-based companies,
                e-commerce brands, SaaS products, and growth-focused businesses across every industry.
              </p>
              <p>
                We built our client portal so everything stays organized — onboarding, brand assets, strategy,
                deliverables, and real-time progress tracking. No more endless email threads or missed updates.
                Just a clean, efficient system that works.
              </p>
              <p>
                Our pricing is transparent. Our process is structured. And our results speak for themselves.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">Our Approach</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Makes Clowd Different</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-7 text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
          Let's Build Your Growth Engine
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Get a transparent estimate or create your account to start onboarding with Clowd Marketing today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/estimate">Get Your Free Strategy <ArrowRight className="ml-1" /></Link>
          </Button>
          <Button variant="hero-secondary" size="xl" asChild>
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
