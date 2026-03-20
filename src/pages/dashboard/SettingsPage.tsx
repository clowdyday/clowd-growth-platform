import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        company_name: profile.company_name,
        industry: profile.industry,
        location: profile.location,
        phone: profile.phone,
      })
      .eq("id", profile.id);
    setSaving(false);
    toast({ title: "Profile updated successfully" });
  };

  if (!profile) return null;

  const fields = [
    { key: "full_name", label: "Full Name", placeholder: "Jane Smith" },
    { key: "company_name", label: "Company Name", placeholder: "Your Company Name" },
    { key: "industry", label: "Industry", placeholder: "e.g. E-Commerce, SaaS, Health & Wellness" },
    { key: "location", label: "Location", placeholder: "City, State or Country" },
    { key: "phone", label: "Phone", placeholder: "(555) 123-4567" },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Settings className="w-6 h-6 text-accent" />
          <h1 className="font-display text-2xl font-bold text-foreground">Account Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">Update your profile and business information.</p>
      </motion.div>

      <div className="glass-card p-8 space-y-5">
        <div className="text-sm text-muted-foreground mb-2">
          Account Email: <span className="text-foreground font-medium">{user?.email}</span>
        </div>
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">{field.label}</label>
            <input
              type="text"
              value={(profile as any)[field.key] || ""}
              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-sm"
            />
          </div>
        ))}
        <Button variant="cta" onClick={handleSave} disabled={saving}>
          <Save className="mr-1 w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
