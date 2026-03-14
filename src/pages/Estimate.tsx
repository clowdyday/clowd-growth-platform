import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Calculator } from "lucide-react";

const industries = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Concrete",
  "Landscaping", "Construction", "Solar", "Pressure Washing", "Other",
];

const websiteOptions = [
  { id: "none", label: "No Website", price: 0 },
  { id: "starter", label: "Starter Website", price: 1500, desc: "5-page responsive site" },
  { id: "growth", label: "Growth Website", price: 3500, desc: "10-page conversion-optimized" },
  { id: "custom", label: "Custom Website", price: null, desc: "Fully custom build" },
];

const organicOptions = [
  { id: "none", label: "No Organic", price: 0 },
  { id: "starter", label: "Starter Organic", price: 500, desc: "3 posts/week, 1 channel" },
  { id: "growth", label: "Growth Organic", price: 1200, desc: "5 posts/week, 2 channels" },
  { id: "authority", label: "Authority Organic", price: 2500, desc: "Daily posting, 3+ channels" },
];

const budgetOptions = [1000, 2500, 5000, 7500, 10000, 15000, 20000];

interface FormData {
  industry: string;
  location: string;
  adBudget: number;
  needWebsite: boolean;
  websitePackage: string;
  wantOrganic: boolean;
  organicPackage: string;
}

const EstimatePage = () => {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [form, setForm] = useState<FormData>({
    industry: "",
    location: "",
    adBudget: 2500,
    needWebsite: false,
    websitePackage: "none",
    wantOrganic: false,
    organicPackage: "none",
  });

  const totalSteps = 4;

  const canProceed = () => {
    switch (step) {
      case 0: return form.industry && form.location;
      case 1: return form.adBudget > 0;
      case 2: return true;
      case 3: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setShowResults(true);
  };

  const adFee = form.adBudget * 0.1;
  const webPkg = websiteOptions.find((w) => w.id === form.websitePackage);
  const orgPkg = organicOptions.find((o) => o.id === form.organicPackage);
  const monthlyTotal = adFee + (orgPkg?.price || 0);
  const projectCost = webPkg?.price || 0;

  const OptionButton = ({
    selected, onClick, label, desc,
  }: { selected: boolean; onClick: () => void; label: string; desc?: string }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-card hover:border-accent/30"
      }`}
    >
      <div className="font-semibold text-sm text-foreground">{label}</div>
      {desc && <div className="text-xs text-muted-foreground mt-1">{desc}</div>}
    </button>
  );

  if (showResults) {
    return (
      <div className="gradient-hero min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Your Custom Estimate
              </h1>
              <p className="text-muted-foreground">Based on your selections for a {form.industry} company in {form.location}.</p>
            </div>

            <div className="glass-card p-8 glow-accent space-y-6">
              {/* Ad Management */}
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                  <div className="font-semibold text-foreground">Ad Management</div>
                  <div className="text-sm text-muted-foreground">${form.adBudget.toLocaleString()}/mo ad spend × 10%</div>
                </div>
                <div className="font-display text-xl font-bold text-foreground">${adFee.toLocaleString()}/mo</div>
              </div>

              {/* Website */}
              {form.websitePackage !== "none" && (
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <div className="font-semibold text-foreground">{webPkg?.label}</div>
                    <div className="text-sm text-muted-foreground">{webPkg?.desc}</div>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">
                    {webPkg?.price ? `$${webPkg.price.toLocaleString()}` : "Custom Quote"}
                  </div>
                </div>
              )}

              {/* Organic */}
              {form.organicPackage !== "none" && (
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <div className="font-semibold text-foreground">{orgPkg?.label}</div>
                    <div className="text-sm text-muted-foreground">{orgPkg?.desc}</div>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">${orgPkg?.price?.toLocaleString()}/mo</div>
                </div>
              )}

              {/* Totals */}
              <div className="bg-muted rounded-xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Estimated Monthly</span>
                  <span className="font-display text-2xl font-bold text-accent">${monthlyTotal.toLocaleString()}/mo</span>
                </div>
                {projectCost > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">One-Time Project Cost</span>
                    <span className="font-display text-lg font-bold text-foreground">${projectCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="hero-primary" size="lg" className="flex-1" asChild>
                  <Link to="/portal">Create Account & Get Started <ArrowRight className="ml-1" /></Link>
                </Button>
                <Button
                  variant="hero-secondary"
                  size="lg"
                  onClick={() => { setShowResults(false); setStep(0); }}
                >
                  Recalculate
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-hero min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Instant Estimate Calculator
            </h1>
            <p className="text-muted-foreground">Get transparent pricing in under 60 seconds. No calls needed.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-colors ${
                  i <= step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>

          <div className="glass-card p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Tell Us About Your Business</h2>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Industry</label>
                      <div className="grid grid-cols-2 gap-2">
                        {industries.map((ind) => (
                          <OptionButton
                            key={ind}
                            selected={form.industry === ind}
                            onClick={() => setForm({ ...form, industry: ind })}
                            label={ind}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Location</label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Monthly Ad Budget</h2>
                    <p className="text-sm text-muted-foreground">Our management fee is 10% of your monthly ad spend.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetOptions.map((b) => (
                        <OptionButton
                          key={b}
                          selected={form.adBudget === b}
                          onClick={() => setForm({ ...form, adBudget: b })}
                          label={`$${b.toLocaleString()}/mo`}
                          desc={`$${(b * 0.1).toLocaleString()} management fee`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Do You Need a Website?</h2>
                    <div className="grid grid-cols-1 gap-2">
                      {websiteOptions.map((opt) => (
                        <OptionButton
                          key={opt.id}
                          selected={form.websitePackage === opt.id}
                          onClick={() =>
                            setForm({ ...form, websitePackage: opt.id, needWebsite: opt.id !== "none" })
                          }
                          label={opt.label}
                          desc={opt.desc || undefined}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Want Organic Social Growth?</h2>
                    <div className="grid grid-cols-1 gap-2">
                      {organicOptions.map((opt) => (
                        <OptionButton
                          key={opt.id}
                          selected={form.organicPackage === opt.id}
                          onClick={() =>
                            setForm({ ...form, organicPackage: opt.id, wantOrganic: opt.id !== "none" })
                          }
                          label={opt.label}
                          desc={opt.desc || undefined}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-1" /> Back
              </Button>
              <Button variant="cta" onClick={handleNext} disabled={!canProceed()}>
                {step === totalSteps - 1 ? "See My Estimate" : "Continue"} <ArrowRight className="ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EstimatePage;
