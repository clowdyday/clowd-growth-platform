import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import type { Tables } from "@/integrations/supabase/types";

export type ClientService = Tables<"client_services">;

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const [services, setServices] = useState<ClientService[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    const fetchServices = async () => {
      const { data } = await supabase
        .from("client_services")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at");
      setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <PortalSidebar services={services} onSignOut={handleSignOut} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm shrink-0">
            <SidebarTrigger className="mr-3 text-muted-foreground hover:text-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {getPageTitle(location.pathname)}
            </span>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            <Outlet context={{ services, setServices }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

function getPageTitle(path: string): string {
  if (path.includes("/ads")) return "Ad Management";
  if (path.includes("/website")) return "Website Creation";
  if (path.includes("/organic")) return "Organic Social Media";
  if (path.includes("/assets")) return "Assets";
  if (path.includes("/settings")) return "Settings";
  return "Dashboard";
}

export default DashboardLayout;
