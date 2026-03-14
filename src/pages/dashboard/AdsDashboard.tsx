import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import type { Tables } from "@/integrations/supabase/types";
import { BarChart3, DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { adsOnboardingSteps } from "@/components/onboarding/onboardingConfigs";

const AdsDashboard = () => {
  const { services } = useOutletContext<{ services: ClientService[] }>();
  const { user } = useAuth();
  const service = services.find((s) => s.service_type === "ad_management");
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
        <p className="text-muted-foreground">You haven't added Ad Management yet. Go to your dashboard to add it.</p>
      </div>
    );
  }

  const isOnboarding = service.status === "onboarding";

  const handleAllComplete = async () => {
    await supabase.from("client_services").update({ status: "active" }).eq("id", service.id);
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
        />
      )}

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
