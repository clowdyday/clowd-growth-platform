import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getTitle = (path: string) => {
    if (path.includes("/admin/clients/")) return "Client Details";
    if (path.includes("/admin/clients")) return "All Clients";
    if (path.includes("/admin/messages")) return "Messages";
    return "Admin Overview";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar onSignOut={handleSignOut} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm shrink-0">
            <SidebarTrigger className="mr-3 text-muted-foreground hover:text-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {getTitle(location.pathname)}
            </span>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
