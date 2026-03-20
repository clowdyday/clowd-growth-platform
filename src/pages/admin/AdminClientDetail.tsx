import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  User, BarChart3, Globe, TrendingUp, MessageSquare,
  Send, CheckCircle2, Clock, Plus, Save,
} from "lucide-react";
import {
  adsOnboardingSteps,
  websiteOnboardingSteps,
  organicOnboardingSteps,
} from "@/components/onboarding/onboardingConfigs";

const serviceLabels: Record<string, string> = {
  ad_management: "Performance Ad Management",
  website: "Website Design & Development",
  organic_social: "Organic Social Media Growth",
};

const serviceIcons: Record<string, any> = {
  ad_management: BarChart3,
  website: Globe,
  organic_social: TrendingUp,
};

const stepConfigs: Record<string, any[]> = {
  ad_management: adsOnboardingSteps,
  website: websiteOnboardingSteps,
  organic_social: organicOnboardingSteps,
};

const AdminClientDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: adminUser } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [services, setServices] = useState<Tables<"client_services">[]>([]);
  const [onboarding, setOnboarding] = useState<Tables<"service_onboarding">[]>([]);
  const [deliverables, setDeliverables] = useState<Tables<"service_deliverables">[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  // New deliverable form
  const [newDeliverable, setNewDeliverable] = useState({
    title: "",
    description: "",
    service_id: "",
    status: "pending",
  });
  const [addingDeliverable, setAddingDeliverable] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      const [p, s, ob, del, msg] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId).single(),
        supabase.from("client_services").select("*").eq("user_id", userId),
        supabase.from("service_onboarding").select("*").eq("user_id", userId),
        supabase.from("service_deliverables").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("messages").select("*").or(`sender_id.eq.${userId},recipient_id.eq.${userId}`).order("created_at"),
      ]);
      setProfile(p.data);
      setServices(s.data || []);
      setOnboarding(ob.data || []);
      setDeliverables(del.data || []);
      setMessages(msg.data || []);
    };
    load();
  }, [userId]);

  // Realtime messages
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`messages-${userId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new as any;
        if (msg.sender_id === userId || msg.recipient_id === userId) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !adminUser || !userId) return;
    setSendingMsg(true);
    await supabase.from("messages").insert({
      sender_id: adminUser.id,
      recipient_id: userId,
      content: newMessage.trim(),
    });
    setNewMessage("");
    setSendingMsg(false);
  };

  const handleAddDeliverable = async () => {
    if (!newDeliverable.title.trim() || !newDeliverable.service_id || !userId) return;
    setAddingDeliverable(true);
    const { data } = await supabase
      .from("service_deliverables")
      .insert({
        user_id: userId,
        service_id: newDeliverable.service_id,
        title: newDeliverable.title,
        description: newDeliverable.description || null,
        status: newDeliverable.status,
      })
      .select()
      .single();
    if (data) {
      setDeliverables([data, ...deliverables]);
      setNewDeliverable({ title: "", description: "", service_id: "", status: "pending" });
      toast({ title: "Deliverable added" });
    }
    setAddingDeliverable(false);
  };

  const handleUpdateStatus = async (serviceId: string, status: string) => {
    await supabase.from("client_services").update({ status }).eq("id", serviceId);
    setServices(services.map((s) => s.id === serviceId ? { ...s, status } : s));
    toast({ title: "Service status updated" });
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Client Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-1">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{profile.full_name || "Unnamed Client"}</h1>
            <p className="text-sm text-muted-foreground">
              {profile.company_name || "No company"} · {profile.industry || ""} · {profile.location || ""}
              {profile.phone && ` · ${profile.phone}`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Services */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Services</h2>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.service_type] || BarChart3;
              return (
                <div key={service.id} className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-sm text-foreground">
                      {serviceLabels[service.service_type]}
                    </span>
                  </div>
                  <Select
                    value={service.status}
                    onValueChange={(val) => handleUpdateStatus(service.id, val)}
                  >
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  {service.monthly_ad_spend && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Ad Spend: ${service.monthly_ad_spend.toLocaleString()}/mo
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6 text-center text-sm text-muted-foreground">No services added yet.</div>
        )}
      </div>

      {/* Onboarding Data */}
      {onboarding.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Onboarding Responses</h2>
          {services.map((service) => {
            const svcOnboarding = onboarding.filter((o) => o.service_id === service.id && o.completed);
            if (svcOnboarding.length === 0) return null;
            const stepsConfig = stepConfigs[service.service_type] || [];

            return (
              <div key={service.id} className="glass-card p-5">
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  {serviceLabels[service.service_type]} – Responses
                </h3>
                <div className="space-y-4">
                  {svcOnboarding.map((ob) => {
                    const stepConfig = stepsConfig.find((s: any) => s.key === ob.step_key);
                    const data = ob.step_data as Record<string, string> | null;
                    if (!data || Object.keys(data).length === 0) return null;

                    return (
                      <div key={ob.id} className="border-l-2 border-accent/30 pl-4">
                        <div className="text-xs font-semibold text-accent mb-1">
                          {stepConfig?.label || ob.step_key}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(data).map(([key, value]) => {
                            const fieldConfig = stepConfig?.fields?.find((f: any) => f.name === key);
                            const displayLabel = fieldConfig?.label || key.replace(/_/g, " ");
                            // For select fields, show the option label
                            let displayValue = value;
                            if (fieldConfig?.options) {
                              const opt = fieldConfig.options.find((o: any) => o.value === value);
                              if (opt) displayValue = opt.label;
                            }
                            return (
                              <div key={key}>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{displayLabel}</span>
                                <div className="text-sm text-foreground">{displayValue || "—"}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Deliverable */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">Deliverables</h2>

        <div className="glass-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Deliverable
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Title</Label>
              <Input
                value={newDeliverable.title}
                onChange={(e) => setNewDeliverable({ ...newDeliverable, title: e.target.value })}
                placeholder="e.g. Landing page mockup"
              />
            </div>
            <div>
              <Label className="text-xs">Service</Label>
              <Select
                value={newDeliverable.service_id}
                onValueChange={(val) => setNewDeliverable({ ...newDeliverable, service_id: val })}
              >
                <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{serviceLabels[s.service_type]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs">Description (optional)</Label>
            <Textarea
              value={newDeliverable.description}
              onChange={(e) => setNewDeliverable({ ...newDeliverable, description: e.target.value })}
              placeholder="Brief description..."
              className="min-h-[60px]"
            />
          </div>
          <Button variant="cta" size="sm" onClick={handleAddDeliverable} disabled={addingDeliverable || !newDeliverable.title || !newDeliverable.service_id}>
            <Save className="mr-1 w-4 h-4" /> Add Deliverable
          </Button>
        </div>

        {deliverables.length > 0 && (
          <div className="space-y-2">
            {deliverables.map((d) => (
              <div key={d.id} className="glass-card p-4 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  d.status === "completed" ? "bg-green-400" : d.status === "in_progress" ? "bg-accent" : "bg-muted-foreground"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">{d.title}</div>
                  {d.description && <div className="text-xs text-muted-foreground truncate">{d.description}</div>}
                </div>
                <Select
                  value={d.status}
                  onValueChange={async (val) => {
                    await supabase.from("service_deliverables").update({ status: val }).eq("id", d.id);
                    setDeliverables(deliverables.map((del) => del.id === d.id ? { ...del, status: val } : del));
                  }}
                >
                  <SelectTrigger className="w-28 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5" /> Messages
        </h2>
        <div className="glass-card p-5">
          <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No messages yet.</p>
            )}
            {messages.map((msg) => {
              const isAdmin = msg.sender_id !== userId;
              return (
                <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    isAdmin
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    {msg.content}
                    <div className={`text-[10px] mt-1 ${isAdmin ? "text-accent-foreground/60" : "text-muted-foreground"}`}>
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            />
            <Button variant="cta" size="sm" onClick={handleSendMessage} disabled={sendingMsg || !newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientDetail;
