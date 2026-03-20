import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import type { Tables } from "@/integrations/supabase/types";
import {
  Globe, Layout, Palette, Code, Rocket,
  Sparkles, Copy, RefreshCw, Loader2, ChevronDown, ChevronUp,
} from "lucide-react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { websiteOnboardingSteps } from "@/components/onboarding/onboardingConfigs";
import { useAI } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const WebsiteDashboard = () => {
  const { services } = useOutletContext<{ services: ClientService[] }>();
  const { user } = useAuth();
  const service = services.find((s) => s.service_type === "website");
  const [onboarding, setOnboarding] = useState<Tables<"service_onboarding">[]>([]);
  const [deliverables, setDeliverables] = useState<Tables<"service_deliverables">[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [style, setStyle] = useState("Modern & Professional");
  const [cta, setCta] = useState("Get a Free Quote");
  const { generate, loading: aiLoading, result: aiResult, error: aiError, reset: aiReset } = useAI();

  useEffect(() => {
    if (!service || !user) return;
    const load = async () => {
      const [ob, del] = await Promise.all([
        supabase.from("service_onboarding").select("*").eq("service_id", service.id),
        supabase.from("service_deliverables").select("*").eq("service_id", service.id).order("created_at", { ascending: false }),
      ]);
      setOnboarding(ob.data || []);
      setDeliverables(del.data || []);
    };
    load();
  }, [service, user]);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">You haven't added Website Creation yet. Go to your dashboard to add it.</p>
      </div>
    );
  }

  const isOnboarding = service.status === "onboarding";

  const handleAllComplete = async () => {
    await supabase.from("client_services").update({ status: "active" }).eq("id", service.id);
  };

  const getOnboardingValue = (key: string) => {
    const entry = onboarding.find((o) => o.step_key === key);
    const data = entry?.step_data as Record<string, string> | null;
    return data?.value || data?.[key] || "";
  };

  const handleGenerateCopy = () => {
    aiReset();
    generate("website_copy", {
      company_name: getOnboardingValue("company_name") || user?.email?.split("@")[0] || "Your Business",
      industry: getOnboardingValue("industry") || "General Business",
      services_offered: getOnboardingValue("services_offered") || getOnboardingValue("what_you_do") || "Professional services",
      target_market: getOnboardingValue("target_market") || getOnboardingValue("target_audience") || "Business owners",
      tagline: getOnboardingValue("tagline") || "",
      about_text: getOnboardingValue("about_text") || getOnboardingValue("about") || "",
      call_to_action: cta,
      style,
    });
  };

  const handleCopyToClipboard = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult);
      toast.success("Website copy copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Globe className="w-6 h-6 text-secondary" />
          <h1 className="font-display text-2xl font-bold text-foreground">Website Design</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {isOnboarding ? "Complete your onboarding so we can start building." : "Your website project overview."}
        </p>
      </motion.div>

      {!isOnboarding && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Package", value: service.package_tier || "—", icon: Layout },
            { label: "Status", value: service.status, icon: Rocket },
            { label: "Design Phase", value: "—", icon: Palette },
            { label: "Dev Phase", value: "—", icon: Code },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <stat.icon className="w-4 h-4 text-secondary mb-2" />
              <div className="font-display text-lg font-bold text-foreground capitalize">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {isOnboarding && (
        <OnboardingForm
          steps={websiteOnboardingSteps}
          serviceId={service.id}
          onboarding={onboarding}
          setOnboarding={setOnboarding}
          onAllComplete={handleAllComplete}
          accentClass="bg-secondary"
          serviceType="website"
        />
      )}

      {/* Website Copy Generator */}
      <div className="glass-card border border-secondary/20 overflow-hidden">
        <button
          type="button"
          className="w-full p-6 flex items-center justify-between hover:bg-secondary/5 transition-colors"
          onClick={() => setShowAI(!showAI)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-foreground">Website Copy Generator</div>
              <div className="text-xs text-muted-foreground">Generate full website copy — hero, about, services, CTAs — ready to hand off</div>
            </div>
          </div>
          {showAI ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>

        {showAI && (
          <div className="px-6 pb-6 space-y-5 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Website Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:border-secondary focus:outline-none"
                >
                  <option>Modern & Professional</option>
                  <option>Bold & Energetic</option>
                  <option>Clean & Minimal</option>
                  <option>Warm & Friendly</option>
                  <option>Luxury & Premium</option>
                  <option>Tech-Forward</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Primary CTA</label>
                <select
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:border-secondary focus:outline-none"
                >
                  <option>Get a Free Quote</option>
                  <option>Book a Free Consultation</option>
                  <option>Get Started Today</option>
                  <option>Shop Now</option>
                  <option>Contact Us</option>
                  <option>Schedule a Call</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="hero-primary"
                size="sm"
                onClick={handleGenerateCopy}
                disabled={aiLoading}
                className="flex-1"
              >
                {aiLoading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Generate Website Copy</>
                )}
              </Button>
              {aiResult && (
                <>
                  <Button variant="hero-secondary" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="w-4 h-4 mr-1" /> Copy All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleGenerateCopy} disabled={aiLoading}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {aiError && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-xl p-4">{aiError}</div>
            )}

            {aiLoading && (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                <span className="text-sm text-muted-foreground">Writing conversion-focused copy for every section of your website...</span>
              </div>
            )}

            {aiResult && !aiLoading && (
              <div className="bg-muted rounded-xl p-5 max-h-[500px] overflow-y-auto">
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <ReactMarkdown>{aiResult}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Deliverables & Updates</h2>
        {deliverables.length > 0 ? (
          <div className="space-y-3">
            {deliverables.map((d) => (
              <div key={d.id} className="glass-card p-5 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${d.status === "completed" ? "bg-green-400" : d.status === "in_progress" ? "bg-secondary" : "bg-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{d.title}</div>
                  {d.description && <div className="text-xs text-muted-foreground">{d.description}</div>}
                </div>
                <span className="text-xs text-muted-foreground capitalize">{d.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isOnboarding ? "Complete onboarding to start your website project." : "No deliverables yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteDashboard;
