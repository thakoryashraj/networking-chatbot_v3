import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  BarChart3,
  Users,
  Calendar,
  Mail,
  Settings,
  Crown,
  HelpCircle,
  ChevronDown,
  Bot,
  User,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { title: "Chat", url: "/", icon: MessageSquare },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Mails", url: "/mails", icon: Mail },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Upgrade", url: "/upgrade", icon: Crown },
  { title: "Tutorial", url: "/tutorial", icon: HelpCircle },
];

export function AppSidebar() {
  const { state, open, setOpen, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const isMobile = useIsMobile();
  const currentPath = location.pathname;
  const [isExpanded, setIsExpanded] = useState(true);
  const collapsed = state === "collapsed" && !isMobile;

  const isActive = (path: string) => currentPath === path;

  const handleUserSectionClick = () => {
    // Close mobile sidebar when navigating
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
    navigate("/profile");
  };

  const handleMenuItemClick = () => {
    // Close mobile sidebar when navigating
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };

  const getUserDisplayName = () => {
    if (profileLoading) return "Loading...";
    return profile?.full_name || user?.email?.split('@')[0] || "User";
  };

  const getUserPlan = () => {
    if (profileLoading) return "Loading...";
    return profile?.plan || "Free";
  };

  return (
    <>
      {/* Mobile Header with Hamburger Menu */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenMobile(!openMobile)}
              className="h-10 w-10"
            >
              {openMobile ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
            </div>
          </div>
        </div>
      )}

      <Sidebar
        className={cn(
          "transition-all duration-300 border-r border-border bg-gradient-sidebar",
          isMobile && "fixed inset-y-0 left-0 z-40"
        )}
        collapsible={isMobile ? "offcanvas" : "icon"}
      >
        <SidebarContent className="p-0">
          {/* Logo/Brand Section */}
          <div className={cn(
            "flex items-center p-4 border-b border-border",
            isMobile && "pt-20" // Add top padding on mobile to account for fixed header
          )}>
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="ml-3">
                <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">SaaS Platform</p>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <SidebarGroup className="flex-1 p-1">
            {!isMobile && (
              <SidebarTrigger className="text-xs font-semibold text-muted-foreground mb-4"/>
            )}
            <SidebarGroupContent>
              <SidebarMenu className={cn("space-y-2", collapsed && !isMobile ? "px-2" : "")}>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={handleMenuItemClick}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            collapsed && !isMobile ? "justify-center" : "",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "hover:bg-secondary text-sidebar-foreground"
                          )
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0 text-foreground" />
                        {(!collapsed || isMobile) && (
                          <span className="font-medium text-foreground">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            {(!collapsed || isMobile) ? (
              <div 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                onClick={handleUserSectionClick}
              >
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {getUserPlan()} User
                  </p>
                </div>
                {currentPath === "/profile" && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            ) : (
              <div 
                className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mx-auto cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                onClick={handleUserSectionClick}
              >
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
            )}
          </div>
        </SidebarContent>
      </Sidebar>

      {/* Mobile Overlay */}
      {isMobile && openMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
}