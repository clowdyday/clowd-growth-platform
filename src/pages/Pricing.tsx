import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const adExamples = [
  { spend: "$1,000", fee: "$100" },
  { spend: "$2,500", fee: "$250" },
  { spend: "$5,000", fee: "$500" },
  { spend: "$10,000", fee: "$1,000" },
];

const websitePackages = [
  {
    name: "Starter Website",
    price: "$1,000",
    period: "one-time",
    features: ["5-page responsive website", "Mobile-optimized design", "Contact form integration", "Basic SEO setup", "1 round of revisions"],
  },
  {
    name: "Growth Website",
    price: "$2,500",
    period: "one-time",
    featured: true,
    features: ["10-page responsive website", "Conversion-optimized layouts", "Advanced SEO setup", "Blog or portfolio section", "Speed optimization", "3 rounds of revisions"],
  },
  {
    name: "Custom Website",
    price: "Custom",
    period: "quote",
    features: ["Fully custom design & development", "Unlimited pages", "Custom functionality", "Advanced integrations", "Dedicated project manager", "Ongoing support options"],
  },
];

const organicPackages = [
  {
    name: "Starter Social",
    price: "$50",
    period: "/month",
    features: ["3 posts per week", "Basic content strategy", "Platform: 1 channel", "Monthly performance report", "Stock + branded graphics"],
  },
  {
    name: "Growth Social",
    price: "$250",
    period: "/month",
    featured: true,
    features: ["5 posts per week", "Content calendar + strategy", "Platforms: 2 channels", "Short-form video content", "Engagement management", "Bi-weekly reporting"],
  },
  {
    name: "Authority Social",
    price: "$1,000",
    period: "/month",
    features: ["Daily posting", "Full content production", "Platforms: 3+ channels", "Video + photo shoots", "Community management", "Dedicated social strategist", "Weekly reporting"],
  },
];

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Pricing — Clowd Marketing",
  "description": "Transparent pricing for contractor marketing services. Ad management at 10% of ad spend, websites from $1,000, social media from $50/month.",
  "url": "https://clowdmarketing.com/pricing"
};

const PackageCard = ({
  name, price, period, features, featured, delay,
}: {
  name: string; price: string; period: string; features: string[]; featured?: boolean; delay: number;
}) => (
  <motion.article
    {...fadeUp}
    transition={{ duration: 0.5, delay }}
    className={`glass-card-hover p-8 flex flex-col ${featured ? "ring-2 ring-accent/20 relative" : ""}`}
  >
    {featured && (
      <span className="absolute -top-3 left-6 text-[10px] font-bold tracking-wider uppercase bg-accent text-accent-foreground px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <h3 className="font-display text-xl font-bold text-foreground mb-1">{name}</h3>
    <div className="mb-5">
      <span className="font-display text-3xl font-bold text-foreground">{price}</span>
      <span className="text-sm text-muted-foreground ml-1">{period}</span>
    </div>
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
    <Button variant={featured ? "cta" : "cta-outline"} asChild>
      <Link to="/estimate">Get Started <ArrowRight className="ml-1" /></Link>
    </Button>
  </motion.article>
);

const PricingPage = () => (
  <div>
    <Helmet>
      <title>Pricing — Transparent Marketing Costs for Contractors | Clowd</title>
      <meta name="description" content="See our transparent pricing: ad management at 10% of spend, websites from $1,000, social media from $50/month. No hidden fees, no contracts." />
      <link rel="canonical" href="https://clowdmarketing.com/pricing" />
      <script type="application/ld+json">{JSON.stringify(pricingJsonLd)}</script>
    </Helmet>

    {/* Hero */}
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">Pricing</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            Transparent Pricing. No Surprises.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Know exactly what you're paying before you sign up. Simple, fair, and built for contractors.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Ad Management Pricing */}
    <section className="section-padding" aria-labelledby="ad-pricing">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Ad Management"
          title="10% of Your Monthly Ad Spend"
          description="Our management fee scales with your budget. The more you invest in ads, the more we invest in your results."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {adExamples.map((ex, i) => (
            <motion.div
              key={ex.spend}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-sm text-muted-foreground mb-1">Ad Spend</div>
              <div className="font-display text-lg font-bold text-foreground mb-3">{ex.spend}</div>
              <div className="text-xs text-muted-foreground mb-1">Management Fee</div>
              <div className="font-display text-2xl font-bold text-accent">{ex.fee}</div>
              <div className="text-xs text-muted-foreground">/month</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Website Packages */}
    <section className="section-padding bg-muted/30" aria-labelledby="website-pricing">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Websites"
          title="Website Packages"
          description="Professional websites built for contractors. Choose the scope that fits your business."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {websitePackages.map((pkg, i) => (
            <PackageCard key={pkg.name} {...pkg} period={pkg.period} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* Organic Packages */}
    <section className="section-padding" aria-labelledby="social-pricing">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Organic Growth"
          title="Social Media Packages"
          description="Build your brand, grow your audience, and establish local authority with consistent social content."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {organicPackages.map((pkg, i) => (
            <PackageCard key={pkg.name} {...pkg} period={pkg.period} delay={i * 0.1} />
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
          Ready to Get Started?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Select your services, get a transparent estimate, and start growing your business today.
        </p>
        <Button variant="hero-primary" size="xl" asChild>
          <Link to="/estimate">Get Started <ArrowRight className="ml-1" /></Link>
        </Button>
      </div>
    </section>
  </div>
);

export default PricingPage;
