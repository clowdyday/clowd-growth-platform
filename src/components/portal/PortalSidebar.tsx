import { useLocation, Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import clowdLogo from "@/assets/clowd-logo.png";
import type { ClientService } from "@/pages/DashboardLayout";
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
import {
  LayoutDashboard, BarChart3, Globe, TrendingUp,
  FolderOpen, Settings, LogOut, Plus,
} from "lucide-react";

const serviceConfig = {
  ad_management: { label: "Ad Management", icon: BarChart3, path: "/dashboard/ads", color: "text-accent" },
  website: { label: "Website", icon: Globe, path: "/dashboard/website", color: "text-secondary" },
  organic_social: { label: "Organic Social", icon: TrendingUp, path: "/dashboard/organic", color: "text-green-400" },
} as const;

interface PortalSidebarProps {
  services: ClientService[];
  onSignOut: () => void;
}

export function PortalSidebar({ services, onSignOut }: PortalSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img src={clowdLogo} alt="Clowd" className="h-7 w-7 shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-foreground">
              Clowd<span className="text-accent">.</span>
            </span>
          )}
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard"
                    end
                    className="hover:bg-muted/50"
                    activeClassName="bg-muted text-foreground font-medium"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {services.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>My Services</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {services.map((service) => {
                  const config = serviceConfig[service.service_type];
                  return (
                    <SidebarMenuItem key={service.id}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={config.path}
                          className="hover:bg-muted/50"
                          activeClassName="bg-muted text-foreground font-medium"
                        >
                          <config.icon className={`mr-2 h-4 w-4 ${config.color}`} />
                          {!collapsed && (
                            <div className="flex items-center justify-between flex-1">
                              <span>{config.label}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                service.status === "active"
                                  ? "bg-green-500/10 text-green-400"
                                  : service.status === "onboarding"
                                  ? "bg-accent/10 text-accent"
                                  : "bg-muted-foreground/10 text-muted-foreground"
                              }`}>
                                {service.status}
                              </span>
                            </div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/assets"
                    className="hover:bg-muted/50"
                    activeClassName="bg-muted text-foreground font-medium"
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Assets</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/settings"
                    className="hover:bg-muted/50"
                    activeClassName="bg-muted text-foreground font-medium"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
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
