import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { ClientService } from "@/pages/DashboardLayout";
import { BarChart3, Globe, TrendingUp, Plus, ArrowRight, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  {
    type: "ad_management" as const,
    label: "Ad Management",
    icon: BarChart3,
    desc: "Paid ads managed and optimized for leads",
    color: "text-accent",
  },
  {
    type: "website" as const,
    label: "Website Creation",
    icon: Globe,
    desc: "Professional contractor website",
    color: "text-secondary",
  },
  {
    type: "organic_social" as const,
    label: "Organic Social Media",
    icon: TrendingUp,
    desc: "Grow your brand on social platforms",
    color: "text-green-400",
  },
];

const DashboardHome = () => {
  const { services, setServices } = useOutletContext<{
    services: ClientService[];
    setServices: (s: ClientService[]) => void;
  }>();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);

  const activeTypes = services.map((s) => s.service_type);

  const handleAddService = async (type: "ad_management" | "website" | "organic_social") => {
    if (!user) return;
    setAdding(true);
    const { data, error } = await supabase
      .from("client_services")
      .insert({ user_id: user.id, service_type: type, status: "onboarding" })
      .select()
      .single();
    if (data) {
      setServices([...services, data]);
    }
    setAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
          Welcome to Your Portal
        </h1>
        <p className="text-muted-foreground">
          Manage your services, track progress, and access everything in one place.
        </p>
      </motion.div>

      {/* Active Services */}
      {services.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Your Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const config = serviceOptions.find((s) => s.type === service.service_type);
              if (!config) return null;
              const paths = {
                ad_management: "/dashboard/ads",
                website: "/dashboard/website",
                organic_social: "/dashboard/organic",
              };
              return (
                <Link
                  key={service.id}
                  to={paths[service.service_type]}
                  className="glass-card-hover p-6 block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <config.icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-sm">{config.label}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        service.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-accent/10 text-accent"
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-accent font-medium">
                    Open Dashboard <ArrowRight className="ml-1 w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Services */}
      {activeTypes.length < 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Add a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceOptions
              .filter((s) => !activeTypes.includes(s.type))
              .map((option) => (
                <div key={option.type} className="glass-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <option.icon className={`w-5 h-5 ${option.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm mb-1">{option.label}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{option.desc}</p>
                  <Button
                    variant="cta"
                    size="sm"
                    onClick={() => handleAddService(option.type)}
                    disabled={adding}
                  >
                    <Plus className="mr-1 w-3 h-3" /> Add Service
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      {services.length === 0 && (
        <div className="glass-card p-10 text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Get Started</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Choose a service above to begin your onboarding process.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
