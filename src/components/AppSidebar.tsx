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
  User
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
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";

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
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const currentPath = location.pathname;
  const [isExpanded, setIsExpanded] = useState(true);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const handleUserSectionClick = () => {
    navigate("/profile");
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
    <div className="h-full w-full bg-gradient-sidebar border-r border-border md:w-64">
      <div className="flex flex-col h-full p-0">
        {/* Logo/Brand Section */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">SaaS Platform</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-2 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 w-full",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-secondary text-sidebar-foreground"
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border">
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
        </div>
      </div>
    </div>
  );
}