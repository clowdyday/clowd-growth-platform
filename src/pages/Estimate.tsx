import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Rocket, Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Stripe price IDs
const PRICE_IDS = {
  website_starter: "price_1TAo86AeO1QDZ44qFscDBd0Q",
  website_growth: "price_1TAo8NAeO1QDZ44qcIroyuJC",
  social_starter: "price_1TAo8WAeO1QDZ44qE3t4rqXp",
  social_growth: "price_1TAo8XAeO1QDZ44q1G397Lcs",
  social_authority: "price_1TAo8YAeO1QDZ44qM81xwjgY",
};

const industries = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Concrete",
  "Landscaping", "Construction", "Solar", "Pressure Washing", "Other",
];

const websiteOptions = [
  { id: "none", label: "No Website", price: 0 },
  { id: "starter", label: "Starter Website", price: 1000, desc: "5-page responsive site" },
  { id: "growth", label: "Growth Website", price: 2500, desc: "10-page conversion-optimized" },
  { id: "custom", label: "Custom Website", price: null, desc: "Fully custom build" },
];

const organicOptions = [
  { id: "none", label: "No Social Management", price: 0 },
  { id: "starter", label: "Starter Social", price: 50, desc: "3 posts/week, 1 channel" },
  { id: "growth", label: "Growth Social", price: 250, desc: "5 posts/week, 2 channels" },
  { id: "authority", label: "Authority Social", price: 100, desc: "Daily posting, 3+ channels" },
];

const budgetOptions = [1000, 2500, 5000, 7500, 10000, 15000, 20000];

interface FormData {
  industry: string;
  location: string;
  companyName: string;
  adBudget: number;
  wantAds: boolean;
  websitePackage: string;
  organicPackage: string;
  logoFile: File | null;
  brandColors: string;
  notes: string;
}

const EstimatePage = () => {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>({
    industry: "",
    location: "",
    companyName: "",
    adBudget: 2500,
    wantAds: true,
    websitePackage: "none",
    organicPackage: "none",
    logoFile: null,
    brandColors: "",
    notes: "",
  });

  const totalSteps = 5;

  const selectedServices = () => {
    const s: string[] = [];
    if (form.wantAds) s.push("Ad Management");
    if (form.websitePackage !== "none") s.push("Website");
    if (form.organicPackage !== "none") s.push("Social Management");
    return s;
  };

  const canProceed = () => {
    switch (step) {
      case 0: return form.industry && form.location.trim() && form.companyName.trim();
      case 1: return selectedServices().length > 0;
      case 2: return true;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setShowResults(true);
  };

  const adFee = form.wantAds ? form.adBudget * 0.1 : 0;
  const webPkg = websiteOptions.find((w) => w.id === form.websitePackage);
  const orgPkg = organicOptions.find((o) => o.id === form.organicPackage);
  const monthlyTotal = adFee + (orgPkg?.price || 0);
  const projectCost = webPkg?.price || 0;

  const OptionButton = ({
    selected, onClick, label, desc, price,
  }: { selected: boolean; onClick: () => void; label: string; desc?: string; price?: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-card hover:border-accent/30"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-sm text-foreground">{label}</div>
          {desc && <div className="text-xs text-muted-foreground mt-1">{desc}</div>}
        </div>
        {price && <span className="text-sm font-bold text-accent">{price}</span>}
      </div>
    </button>
  );

  if (showResults) {
    return (
      <div className="gradient-hero min-h-screen pt-32 pb-20">
        <Helmet>
          <title>Your Estimate — Clowd Marketing</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Your Custom Estimate
              </h1>
              <p className="text-muted-foreground">Based on your selections for {form.companyName} — {form.industry} in {form.location}.</p>
            </div>

            <div className="glass-card p-8 glow-accent space-y-6">
              {form.wantAds && (
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <div className="font-semibold text-foreground">Ad Management</div>
                    <div className="text-sm text-muted-foreground">${form.adBudget.toLocaleString()}/mo ad spend × 10%</div>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">${adFee.toLocaleString()}/mo</div>
                </div>
              )}

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

              {form.organicPackage !== "none" && (
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <div className="font-semibold text-foreground">{orgPkg?.label}</div>
                    <div className="text-sm text-muted-foreground">{orgPkg?.desc}</div>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">${orgPkg?.price?.toLocaleString()}/mo</div>
                </div>
              )}

              <div className="bg-muted rounded-xl p-6 space-y-3">
                {monthlyTotal > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">Estimated Monthly</span>
                    <span className="font-display text-2xl font-bold text-accent">${monthlyTotal.toLocaleString()}/mo</span>
                  </div>
                )}
                {projectCost > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">One-Time Project Cost</span>
                    <span className="font-display text-lg font-bold text-foreground">${projectCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="hero-primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate(user ? "/dashboard" : "/auth")}
                >
                  {user ? "Go to Dashboard" : "Create Account & Buy Now"} <ArrowRight className="ml-1" />
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
      <Helmet>
        <title>Get Started — Build Your Marketing Plan | Clowd Marketing</title>
        <meta name="description" content="Select your services, tell us about your business, and get a transparent estimate in under 60 seconds. No calls needed." />
        <link rel="canonical" href="https://clowdmarketing.com/estimate" />
      </Helmet>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-7 h-7 text-accent" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Get Started
            </h1>
            <p className="text-muted-foreground">Tell us about your business and we'll build your custom plan.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
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
                      <label htmlFor="companyName" className="text-sm font-semibold text-foreground mb-2 block">Company Name</label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="Your Company"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
                      />
                    </div>
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
                      <label htmlFor="location" className="text-sm font-semibold text-foreground mb-2 block">Location</label>
                      <input
                        id="location"
                        type="text"
                        placeholder="City, State"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Select Your Services</h2>
                    <p className="text-sm text-muted-foreground">Choose one or more services to include in your plan.</p>
                    <div className="space-y-3">
                      <OptionButton
                        selected={form.wantAds}
                        onClick={() => setForm({ ...form, wantAds: !form.wantAds })}
                        label="Ad Management"
                        desc="10% of monthly ad spend"
                        price="From $100/mo"
                      />
                      {websiteOptions.filter(o => o.id !== "none").map((opt) => (
                        <OptionButton
                          key={opt.id}
                          selected={form.websitePackage === opt.id}
                          onClick={() => setForm({ ...form, websitePackage: form.websitePackage === opt.id ? "none" : opt.id })}
                          label={opt.label}
                          desc={opt.desc}
                          price={opt.price ? `$${opt.price.toLocaleString()}` : "Custom"}
                        />
                      ))}
                      {organicOptions.filter(o => o.id !== "none").map((opt) => (
                        <OptionButton
                          key={opt.id}
                          selected={form.organicPackage === opt.id}
                          onClick={() => setForm({ ...form, organicPackage: form.organicPackage === opt.id ? "none" : opt.id })}
                          label={opt.label}
                          desc={opt.desc}
                          price={`$${opt.price}/mo`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && form.wantAds && (
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

                {step === 2 && !form.wantAds && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Brand Details</h2>
                    <p className="text-sm text-muted-foreground">Help us understand your brand better.</p>
                    <div>
                      <label htmlFor="brandColors" className="text-sm font-semibold text-foreground mb-2 block">Brand Colors (optional)</label>
                      <input
                        id="brandColors"
                        type="text"
                        placeholder="e.g. Blue and white, #1a1a1a"
                        value={form.brandColors}
                        onChange={(e) => setForm({ ...form, brandColors: e.target.value })}
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Upload Your Assets</h2>
                    <p className="text-sm text-muted-foreground">Upload your logo, photos, or any brand materials. You can also do this later from your dashboard.</p>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/40 transition-colors"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") document.getElementById("file-upload")?.click(); }}
                    >
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground">
                        {form.logoFile ? form.logoFile.name : "Click to upload logo or brand assets"}
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setForm({ ...form, logoFile: e.target.files?.[0] || null })}
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="text-sm font-semibold text-foreground mb-2 block">Additional Notes (optional)</label>
                      <textarea
                        id="notes"
                        placeholder="Any specific goals, preferences, or details..."
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        rows={3}
                        maxLength={1000}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-foreground">Review Your Selections</h2>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-muted">
                        <div className="text-xs text-muted-foreground mb-1">Company</div>
                        <div className="font-semibold text-foreground">{form.companyName} — {form.industry}, {form.location}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted">
                        <div className="text-xs text-muted-foreground mb-1">Selected Services</div>
                        <div className="font-semibold text-foreground">{selectedServices().join(", ") || "None"}</div>
                      </div>
                      {form.wantAds && (
                        <div className="p-4 rounded-xl bg-muted">
                          <div className="text-xs text-muted-foreground mb-1">Ad Budget</div>
                          <div className="font-semibold text-foreground">${form.adBudget.toLocaleString()}/mo → ${adFee.toLocaleString()}/mo fee</div>
                        </div>
                      )}
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
                type="button"
              >
                <ArrowLeft className="mr-1" /> Back
              </Button>
              <Button variant="cta" onClick={handleNext} disabled={!canProceed()} type="button">
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
