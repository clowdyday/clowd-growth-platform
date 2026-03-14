import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { FolderOpen, Upload, Trash2, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AssetsDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Tables<"client_assets">[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("client_assets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setAssets(data || []));
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    setUploading(true);

    for (const file of Array.from(e.target.files)) {
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("client-assets")
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("client-assets")
        .getPublicUrl(filePath);

      const { data } = await supabase.from("client_assets").insert({
        user_id: user.id,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: file.type,
      }).select().single();

      if (data) setAssets((prev) => [data, ...prev]);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (asset: Tables<"client_assets">) => {
    await supabase.from("client_assets").delete().eq("id", asset.id);
    setAssets((prev) => prev.filter((a) => a.id !== asset.id));
    toast({ title: "Asset deleted" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <FolderOpen className="w-6 h-6 text-accent" />
              <h1 className="font-display text-2xl font-bold text-foreground">Assets</h1>
            </div>
            <p className="text-muted-foreground text-sm">Upload logos, photos, videos, and brand materials.</p>
          </div>
          <label>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <Button variant="cta" size="sm" asChild disabled={uploading}>
              <span className="cursor-pointer">
                <Upload className="mr-1 w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Files"}
              </span>
            </Button>
          </label>
        </div>
      </motion.div>

      {assets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="glass-card p-4 group">
              <div className="h-32 bg-muted rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                {asset.file_type?.startsWith("image") ? (
                  <img src={asset.file_url} alt={asset.file_name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <FileText className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium truncate flex-1">{asset.file_name}</span>
                <button
                  onClick={() => handleDelete(asset)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <Image className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-foreground mb-1">No assets yet</h3>
          <p className="text-sm text-muted-foreground">Upload your logos, photos, and brand materials to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AssetsDashboard;
