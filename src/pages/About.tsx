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
  { icon: Target, title: "Niche Focus", desc: "We only work with blue-collar and local service businesses. That's our lane, and we stay in it." },
  { icon: Cog, title: "Systemized Delivery", desc: "Every client goes through the same proven process — structured onboarding, clear timelines, and real deliverables." },
  { icon: Users, title: "Built for Contractors", desc: "We speak your language. No marketing jargon, no vague promises. Just clear strategy and measurable results." },
  { icon: TrendingUp, title: "Growth-Focused", desc: "Every campaign, website, and post is designed with one goal: more leads, more booked jobs, more revenue." },
];

const AboutPage = () => (
  <div>
    {/* Hero */}
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">About Us</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            We Build Marketing Systems for Contractors.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Clowd Marketing exists because most marketing agencies don't understand blue-collar businesses.
            They sell generic packages, use cookie-cutter strategies, and leave contractors guessing whether
            their money is actually working.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
              We Know How Contractors Operate
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Contractors don't need a 40-slide deck explaining "brand synergy." They need calls,
                booked jobs, and a web presence that makes them look professional and trustworthy.
              </p>
              <p>
                That's what we deliver. Our team specializes in ad campaigns, websites, and social
                content for roofing, HVAC, plumbing, electrical, concrete, landscaping, construction,
                and solar companies.
              </p>
              <p>
                We built our client portal so everything stays organized — onboarding, assets, strategy,
                deliverables, and progress tracking. No more endless email threads or missed phone calls.
                Just a clean system that works.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">How We're Different</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-7 flex gap-5"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
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
          Let's Get Your Marketing Running
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Get a transparent estimate or create your account to start onboarding today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero-primary" size="xl" asChild>
            <Link to="/estimate">Get Instant Estimate <ArrowRight className="ml-1" /></Link>
          </Button>
          <Button variant="hero-secondary" size="xl" asChild>
            <Link to="/portal">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
