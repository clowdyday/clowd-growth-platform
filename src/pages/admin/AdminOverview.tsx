import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Users, BarChart3, Globe, TrendingUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeServices: 0,
    onboarding: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [profiles, services, messages] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("client_services").select("status"),
        supabase.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);

      const svcData = services.data || [];
      setStats({
        totalClients: profiles.count || 0,
        activeServices: svcData.filter((s) => s.status === "active").length,
        onboarding: svcData.filter((s) => s.status === "onboarding").length,
        unreadMessages: messages.count || 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Total Clients", value: stats.totalClients, icon: Users, color: "text-accent" },
    { label: "Active Services", value: stats.activeServices, icon: BarChart3, color: "text-green-400" },
    { label: "Onboarding", value: stats.onboarding, icon: TrendingUp, color: "text-secondary" },
    { label: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare, color: "text-yellow-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all clients, services, and activity.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-5">
            <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
            <div className="font-display text-2xl font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/clients" className="glass-card-hover p-6 block">
          <Users className="w-6 h-6 text-accent mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground mb-1">Manage Clients</h2>
          <p className="text-sm text-muted-foreground">View all clients, their services, and onboarding data.</p>
        </Link>
        <Link to="/admin/messages" className="glass-card-hover p-6 block">
          <MessageSquare className="w-6 h-6 text-yellow-400 mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground mb-1">Messages</h2>
          <p className="text-sm text-muted-foreground">Communicate with your clients directly.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;
