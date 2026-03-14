import { useLocation, Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import clowdLogo from "@/assets/clowd-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, MessageSquare, LogOut, Shield } from "lucide-react";

interface AdminSidebarProps {
  onSignOut: () => void;
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img src={clowdLogo} alt="Clowd" className="h-7 w-7 shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-foreground">
              Admin<span className="text-destructive">.</span>
            </span>
          )}
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Shield className="w-3 h-3 mr-1" /> Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin" end className="hover:bg-muted/50" activeClassName="bg-muted text-foreground font-medium">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/clients" className="hover:bg-muted/50" activeClassName="bg-muted text-foreground font-medium">
                    <Users className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Clients</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admin/messages" className="hover:bg-muted/50" activeClassName="bg-muted text-foreground font-medium">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Messages</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mb-1"
        >
          <LayoutDashboard className="h-4 w-4" />
          {!collapsed && <span>Client Portal</span>}
        </Link>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
