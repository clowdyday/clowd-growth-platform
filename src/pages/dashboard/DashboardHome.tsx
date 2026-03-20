import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import {
  BarChart3, Globe, TrendingUp, Plus, ArrowRight, Sparkles,
  FileText, Loader2, Copy, RefreshCw, ChevronDown, ChevronUp,
} from "lucide-react";
import { useAI } from "@/hooks/useAI";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const serviceOptions = [
  {
    type: "ad_management" as const,
    label: "Performance Ad Management",
    icon: BarChart3,
    desc: "Data-driven ad campaigns on Google, Meta, and more — built for measurable ROI.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    type: "website" as const,
    label: "Website Design & Development",
    icon: Globe,
    desc: "A fast, conversion-focused website that turns visitors into customers.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    type: "organic_social" as const,
    label: "Organic Social Media Growth",
    icon: TrendingUp,
    desc: "Strategic content that builds brand authority and grows your audience.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
];

const statusLabel: Record<string, { label: string; classes: string }> = {
  onboarding: { label: "Onboarding", classes: "bg-accent/10 text-accent" },
  active: { label: "Active", classes: "bg-green-500/10 text-green-400" },
  paused: { label: "Paused", classes: "bg-yellow-500/10 text-yellow-400" },
  completed: { label: "Completed", classes: "bg-muted text-muted-foreground" },
};

const DashboardHome = () => {
  const { services, setServices } = useOutletContext<{
    services: ClientService[];
    setServices: (s: ClientService[]) => void;
  }>();
  const { user } = useAuth();
  const [adding, setAdding] = useState<string | null>(null);
  const [showBrief, setShowBrief] = useState(false);
  const [allOnboarding, setAllOnboarding] = useState<{ step_key: string; step_data: Record<string, string> | null }[]>([]);
  const { generate, loading: aiLoading, result: aiResult, error: aiError, reset: aiReset } = useAI();

  const activeTypes = services.map((s) => s.service_type);
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  // Load all onboarding data across all services for the strategy brief
  useEffect(() => {
    if (!user || services.length === 0) return;
    const loadAllOnboarding = async () => {
      const serviceIds = services.map((s) => s.id);
      const { data } = await supabase
        .from("service_onboarding")
        .select("field_name, field_value")
        .in("service_id", serviceIds);
      setAllOnboarding(data || []);
    };
    loadAllOnboarding();
  }, [user, services]);

  const getField = (key: string) => {
    const entry = allOnboarding.find((o) => o.field_name === key);
    return entry?.field_value || "";
  };

  const handleAddService = async (type: "ad_management" | "website" | "organic_social") => {
    if (!user) return;
    setAdding(type);
    const { data } = await supabase
      .from("client_services")
      .insert({ user_id: user.id, service_type: type, status: "onboarding" })
      .select()
      .single();
    if (data) setServices([...services, data]);
    setAdding(null);
  };

  const handleGenerateBrief = () => {
    aiReset();
    const adService = services.find((s) => s.service_type === "ad_management");
    generate("strategy_brief", {
      company_name: getField("company_name") || user?.email?.split("@")[0] || "Your Business",
      industry: getField("industry") || "General Business",
      location: getField("location") || "United States",
      goals: getField("campaign_goal") || getField("goals") || "Generate leads and grow revenue",
      monthly_budget: adService?.monthly_ad_spend || getField("monthly_budget") || "Not specified",
      campaign_type: getField("campaign_type") || activeTypes.join(", ") || "Digital Marketing",
      age_range: getField("age_range") || "25-54",
      targeting_gender: getField("targeting_gender") || "All",
      interests: getField("interests") || getField("target_audience"),
      platforms: getField("platforms") || "Google & Meta",
      website_url: getField("website_url") || getField("current_website"),
    });
  };

  const handleCopyBrief = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult);
      toast.success("Strategy brief copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Manage your services, track progress, and access everything in one place.
        </p>
      </motion.div>

      {/* Active Services */}
      {services.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Your Active Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const config = serviceOptions.find((s) => s.type === service.service_type);
              if (!config) return null;
              const paths: Record<string, string> = {
                ad_management: "/dashboard/ads",
                website: "/dashboard/website",
                organic_social: "/dashboard/organic",
              };
              const status = statusLabel[service.status] || statusLabel.onboarding;
              return (
                <Link
                  key={service.id}
                  to={paths[service.service_type]}
                  className="glass-card-hover p-6 block group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                      <config.icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-sm">{config.label}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status.classes}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-accent font-medium group-hover:gap-2 transition-all">
                    Open Dashboard <ArrowRight className="ml-1 w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Strategy Brief Generator — only show when at least one service exists */}
      {services.length > 0 && (
        <div className="glass-card border border-accent/20 overflow-hidden">
          <button
            type="button"
            className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
            onClick={() => setShowBrief(!showBrief)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <div className="font-display font-bold text-foreground">AI Strategy Brief</div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-accent/20 text-accent px-2 py-0.5 rounded-full">New</span>
                </div>
                <div className="text-xs text-muted-foreground">Generate a personalized 90-day marketing strategy brief for your business</div>
              </div>
            </div>
            {showBrief ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {showBrief && (
            <div className="px-6 pb-6 space-y-5 border-t border-border">
              <p className="text-sm text-muted-foreground pt-5">
                Your strategy brief is generated using your onboarding data. The more onboarding steps you complete, the more personalized and detailed your brief will be.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="hero-primary"
                  size="sm"
                  onClick={handleGenerateBrief}
                  disabled={aiLoading}
                  className="flex-1"
                >
                  {aiLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Brief...</>
                  ) : (
                    <><Sparkles className="w-4 h-4 mr-2" /> Generate 90-Day Strategy Brief</>
                  )}
                </Button>
                {aiResult && (
                  <>
                    <Button variant="hero-secondary" size="sm" onClick={handleCopyBrief}>
                      <Copy className="w-4 h-4 mr-1" /> Copy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleGenerateBrief} disabled={aiLoading}>
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
                  <span className="text-sm text-muted-foreground">Analyzing your business and building a 90-day strategy...</span>
                </div>
              )}

              {aiResult && !aiLoading && (
                <div className="bg-muted rounded-xl p-6 max-h-[600px] overflow-y-auto">
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <ReactMarkdown>{aiResult}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add Services */}
      {activeTypes.length < 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">
            {services.length === 0 ? "Get Started — Choose Your Services" : "Add Another Service"}
          </h2>
          {services.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Select one or more services below to begin your onboarding. You can add more at any time.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceOptions
              .filter((s) => !activeTypes.includes(s.type))
              .map((option) => (
                <div key={option.type} className="glass-card p-6 flex flex-col">
                  <div className={`w-10 h-10 rounded-xl ${option.bgColor} flex items-center justify-center mb-4`}>
                    <option.icon className={`w-5 h-5 ${option.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-1">{option.label}</h3>
                  <p className="text-xs text-muted-foreground mb-5 flex-1">{option.desc}</p>
                  <Button
                    variant="cta"
                    size="sm"
                    onClick={() => handleAddService(option.type)}
                    disabled={adding !== null}
                  >
                    {adding === option.type ? (
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> Adding...
                      </span>
                    ) : (
                      <><Plus className="mr-1 w-3 h-3" /> Add Service</>
                    )}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {services.length === 0 && (
        <div className="glass-card p-8 text-center border border-dashed border-border">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Your Growth Journey Starts Here</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Add your first service above to begin onboarding with Clowd Marketing. We'll guide you through every step.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
