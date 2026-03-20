import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import type { Tables } from "@/integrations/supabase/types";
import { BarChart3, DollarSign, Target, TrendingUp, Users, Sparkles, Copy, RefreshCw, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { adsOnboardingSteps } from "@/components/onboarding/onboardingConfigs";
import { useAI } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const AdsDashboard = () => {
  const { services } = useOutletContext<{ services: ClientService[] }>();
  const { user } = useAuth();
  const service = services.find((s) => s.service_type === "ad_management");
  const [onboarding, setOnboarding] = useState<Tables<"service_onboarding">[]>([]);
  const [deliverables, setDeliverables] = useState<Tables<"service_deliverables">[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [platform, setPlatform] = useState("Google & Meta");
  const [campaignGoal, setCampaignGoal] = useState("Lead Generation");
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
        <p className="text-muted-foreground">You haven't added Ad Management yet. Go to your dashboard to add it.</p>
      </div>
    );
  }

  const isOnboarding = service.status === "onboarding";

  const handleAllComplete = async () => {
    await supabase.from("client_services").update({ status: "active" }).eq("id", service.id);
  };

  // Pull business info from onboarding data
  const getOnboardingValue = (key: string) => {
    const entry = onboarding.find((o) => o.step_key === key);
    const data = entry?.step_data as Record<string, string> | null;
    return data?.value || data?.[key] || "";
  };

  const handleGenerateCopy = () => {
    aiReset();
    generate("ad_copy", {
      company_name: getOnboardingValue("company_name") || user?.email?.split("@")[0] || "Your Business",
      industry: getOnboardingValue("industry") || "General Business",
      location: getOnboardingValue("location") || "United States",
      interests: getOnboardingValue("interests") || getOnboardingValue("target_audience"),
      campaign_type: campaignGoal,
      platforms: platform,
    });
  };

  const handleCopyToClipboard = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult);
      toast.success("Ad copy copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 className="w-6 h-6 text-accent" />
          <h1 className="font-display text-2xl font-bold text-foreground">Ad Management</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {isOnboarding ? "Complete your onboarding to get your campaigns started." : "Your ad campaigns at a glance."}
        </p>
      </motion.div>

      {!isOnboarding && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Monthly Spend", value: `$${(service.monthly_ad_spend || 0).toLocaleString()}`, icon: DollarSign },
            { label: "Management Fee", value: `$${((service.monthly_ad_spend || 0) * 0.1).toLocaleString()}`, icon: Target },
            { label: "Active Campaigns", value: "—", icon: TrendingUp },
            { label: "Leads This Month", value: "—", icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <stat.icon className="w-4 h-4 text-accent mb-2" />
              <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {isOnboarding && (
        <OnboardingForm
          steps={adsOnboardingSteps}
          serviceId={service.id}
          onboarding={onboarding}
          setOnboarding={setOnboarding}
          onAllComplete={handleAllComplete}
          accentClass="bg-accent"
          serviceType="ads"
        />
      )}

      {/* AI Ad Copy Generator */}
      <div className="glass-card border border-accent/20 overflow-hidden">
        <button
          type="button"
          className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
          onClick={() => setShowAI(!showAI)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-foreground">AI Ad Copy Generator</div>
              <div className="text-xs text-muted-foreground">Generate ready-to-use Google & Meta ad copy for your campaigns</div>
            </div>
          </div>
          {showAI ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>

        {showAI && (
          <div className="px-6 pb-6 space-y-5 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none"
                >
                  <option>Google & Meta</option>
                  <option>Google Ads Only</option>
                  <option>Meta (Facebook & Instagram)</option>
                  <option>Instagram Only</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Campaign Goal</label>
                <select
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:border-accent focus:outline-none"
                >
                  <option>Lead Generation</option>
                  <option>Sales / E-Commerce</option>
                  <option>Brand Awareness</option>
                  <option>Website Traffic</option>
                  <option>App Downloads</option>
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
                  <><Sparkles className="w-4 h-4 mr-2" /> Generate Ad Copy</>
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
                <Loader2 className="w-4 h-4 text-accent animate-spin" />
                <span className="text-sm text-muted-foreground">Writing high-converting ad copy for your campaigns...</span>
              </div>
            )}

            {aiResult && !aiLoading && (
              <div className="bg-muted rounded-xl p-5">
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
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  d.status === "completed" ? "bg-green-400" : d.status === "in_progress" ? "bg-accent" : "bg-muted-foreground"
                }`} />
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
              {isOnboarding ? "Complete onboarding to receive your first deliverables." : "No deliverables yet. Check back soon."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsDashboard;
