import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Users, ArrowRight, BarChart3, Globe, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const serviceIcons: Record<string, any> = {
  ad_management: BarChart3,
  website: Globe,
  organic_social: TrendingUp,
};

const serviceLabels: Record<string, string> = {
  ad_management: "Ads",
  website: "Website",
  organic_social: "Social",
};

const AdminClients = () => {
  const [profiles, setProfiles] = useState<Tables<"profiles">[]>([]);
  const [services, setServices] = useState<Tables<"client_services">[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const [p, s] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("client_services").select("*"),
      ]);
      setProfiles(p.data || []);
      setServices(s.data || []);
    };
    load();
  }, []);

  const filteredProfiles = profiles.filter(
    (p) =>
      (p.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.industry || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Users className="w-6 h-6 text-accent" />
          <h1 className="font-display text-2xl font-bold text-foreground">All Clients</h1>
        </div>
        <p className="text-muted-foreground text-sm">{profiles.length} clients total</p>
      </motion.div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-3">
        {filteredProfiles.map((profile) => {
          const clientServices = services.filter((s) => s.user_id === profile.user_id);
          return (
            <Link
              key={profile.id}
              to={`/admin/clients/${profile.user_id}`}
              className="glass-card-hover p-5 flex items-center gap-4 block"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <span className="text-accent font-bold text-sm">
                  {(profile.full_name || "?")[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">
                  {profile.full_name || "Unnamed"}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {profile.company_name || "No company"} · {profile.industry || "No industry"} · {profile.location || "No location"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {clientServices.map((s) => {
                  const Icon = serviceIcons[s.service_type] || BarChart3;
                  return (
                    <span
                      key={s.id}
                      className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        s.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {serviceLabels[s.service_type]}
                    </span>
                  );
                })}
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
          );
        })}

        {filteredProfiles.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-muted-foreground">No clients found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClients;
