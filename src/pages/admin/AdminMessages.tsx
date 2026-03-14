import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, ArrowRight } from "lucide-react";

interface ConversationPreview {
  userId: string;
  name: string;
  lastMessage: string;
  lastDate: string;
  unread: number;
}

const AdminMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get all messages where admin is involved
      const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (!messages) return;

      // Group by other user
      const convMap = new Map<string, { msgs: any[] }>();
      for (const msg of messages) {
        const otherUserId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        if (!convMap.has(otherUserId)) convMap.set(otherUserId, { msgs: [] });
        convMap.get(otherUserId)!.msgs.push(msg);
      }

      // Fetch profiles for all conversation partners
      const userIds = Array.from(convMap.keys());
      if (userIds.length === 0) return;

      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, company_name")
        .in("user_id", userIds);

      const profileMap = new Map((profiles || []).map((p) => [p.user_id, p]));

      const convos: ConversationPreview[] = userIds.map((uid) => {
        const data = convMap.get(uid)!;
        const profile = profileMap.get(uid);
        const last = data.msgs[0];
        const unread = data.msgs.filter((m) => m.recipient_id === user.id && !m.is_read).length;
        return {
          userId: uid,
          name: profile?.full_name || profile?.company_name || "Unknown",
          lastMessage: last.content,
          lastDate: last.created_at,
          unread,
        };
      });

      setConversations(convos);
    };
    load();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <MessageSquare className="w-6 h-6 text-yellow-400" />
          <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        </div>
        <p className="text-muted-foreground text-sm">All client conversations.</p>
      </motion.div>

      <div className="space-y-3">
        {conversations.map((conv) => (
          <Link
            key={conv.userId}
            to={`/admin/clients/${conv.userId}`}
            className="glass-card-hover p-5 flex items-center gap-4 block"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-accent font-bold text-sm">{conv.name[0]?.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">{conv.name}</span>
                {conv.unread > 0 && (
                  <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {conv.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">
              {new Date(conv.lastDate).toLocaleDateString()}
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </Link>
        ))}

        {conversations.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-muted-foreground">No conversations yet. Messages from clients will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
