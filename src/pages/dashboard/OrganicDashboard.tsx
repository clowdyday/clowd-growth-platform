import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import type { Tables } from "@/integrations/supabase/types";
import { TrendingUp, CheckCircle2, Circle, Calendar, Hash, Eye, Heart } from "lucide-react";

const onboardingSteps = [
  { key: "brand_voice", label: "Brand Voice & Tone", desc: "Define how your brand should sound on social media" },
  { key: "platforms", label: "Platform Selection", desc: "Choose which social platforms to focus on" },
  { key: "content_pillars", label: "Content Pillars", desc: "Define key topics and themes for your content" },
  { key: "visual_assets", label: "Visual Assets", desc: "Upload project photos, team photos, and brand materials" },
  { key: "posting_schedule", label: "Posting Schedule", desc: "Set your preferred posting frequency and times" },
];

const OrganicDashboard = () => {
  const { services } = useOutletContext<{ services: ClientService[] }>();
  const { user } = useAuth();
  const service = services.find((s) => s.service_type === "organic_social");
  const [onboarding, setOnboarding] = useState<Tables<"service_onboarding">[]>([]);
  const [deliverables, setDeliverables] = useState<Tables<"service_deliverables">[]>([]);

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
        <p className="text-muted-foreground">You haven't added Organic Social yet. Go to your dashboard to add it.</p>
      </div>
    );
  }

  const completedSteps = onboarding.filter((s) => s.completed).length;
  const isOnboarding = service.status === "onboarding";

  const handleCompleteStep = async (stepKey: string) => {
    if (!user || !service) return;
    const existing = onboarding.find((o) => o.step_key === stepKey);
    if (existing) {
      await supabase.from("service_onboarding").update({ completed: true }).eq("id", existing.id);
      setOnboarding(onboarding.map((o) => o.id === existing.id ? { ...o, completed: true } : o));
    } else {
      const { data } = await supabase.from("service_onboarding").insert({
        user_id: user.id,
        service_id: service.id,
        step_key: stepKey,
        completed: true,
      }).select().single();
      if (data) setOnboarding([...onboarding, data]);
    }
    if (completedSteps + 1 >= onboardingSteps.length) {
      await supabase.from("client_services").update({ status: "active" }).eq("id", service.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h1 className="font-display text-2xl font-bold text-foreground">Organic Social Media</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {isOnboarding ? "Complete onboarding to start your social media strategy." : "Your organic growth at a glance."}
        </p>
      </motion.div>

      {!isOnboarding && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Package", value: service.package_tier || "—", icon: Calendar },
            { label: "Posts This Month", value: "—", icon: Hash },
            { label: "Impressions", value: "—", icon: Eye },
            { label: "Engagement", value: "—", icon: Heart },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <stat.icon className="w-4 h-4 text-green-400 mb-2" />
              <div className="font-display text-lg font-bold text-foreground capitalize">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {isOnboarding && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">Onboarding Progress</h2>
            <span className="text-sm text-muted-foreground">{completedSteps}/{onboardingSteps.length} complete</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full transition-all duration-500" style={{ width: `${(completedSteps / onboardingSteps.length) * 100}%` }} />
          </div>
          <div className="space-y-3">
            {onboardingSteps.map((step, i) => {
              const completed = onboarding.some((o) => o.step_key === step.key && o.completed);
              return (
                <button
                  key={step.key}
                  onClick={() => !completed && handleCompleteStep(step.key)}
                  className={`w-full glass-card p-5 flex items-center gap-4 text-left transition-all ${completed ? "opacity-60" : "hover:border-green-400/30 cursor-pointer"}`}
                  disabled={completed}
                >
                  {completed ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                  <div>
                    <div className="font-semibold text-sm text-foreground">{step.label}</div>
                    <div className="text-xs text-muted-foreground">{step.desc}</div>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">Step {i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Deliverables & Updates</h2>
        {deliverables.length > 0 ? (
          <div className="space-y-3">
            {deliverables.map((d) => (
              <div key={d.id} className="glass-card p-5 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${d.status === "completed" ? "bg-green-400" : d.status === "in_progress" ? "bg-green-400/60" : "bg-muted-foreground"}`} />
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
              {isOnboarding ? "Complete onboarding to start your content strategy." : "No deliverables yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganicDashboard;
