import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Clock,
  Bookmark,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  MessageSquare,
  User,
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: (path: string) => void;
  userName?: string;
  userAvatar?: string;
  searchHistory?: Array<{ id: string; query: string; date: string }>;
}

const Sidebar = ({
  isCollapsed = false,
  onToggleCollapse = () => {},
  onNavigate = () => {},
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  searchHistory = [
    { id: "1", query: "What is quantum computing?", date: "2 hours ago" },
    { id: "2", query: "How does AI work?", date: "Yesterday" },
    { id: "3", query: "Latest news on climate change", date: "2 days ago" },
    {
      id: "4",
      query: "Best programming languages to learn in 2023",
      date: "3 days ago",
    },
    { id: "5", query: "Explain blockchain technology", date: "1 week ago" },
  ],
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    onNavigate(path);
  };

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "search", label: "Search", icon: <Search size={20} /> },
    { id: "history", label: "History", icon: <Clock size={20} /> },
    { id: "bookmarks", label: "Bookmarks", icon: <Bookmark size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64 sm:w-72",
      )}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold">Perplexity</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <Separator />

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          className={cn(
            "w-full bg-purple-600 hover:bg-purple-700 text-white",
            isCollapsed ? "px-0 justify-center" : "px-4",
          )}
          onClick={() => handleNavigation("new-chat")}
        >
          <Plus size={18} className="mr-0 sm:mr-2" />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 py-2 my-1",
                  activeItem === item.id
                    ? "bg-purple-50 text-purple-700 dark:bg-gray-800 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300",
                  isCollapsed && "justify-center",
                )}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="flex items-center">
                  {item.icon}
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Separator className="my-2" />

      {/* Search History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recent Searches
            </h3>
          </div>
          <ScrollArea className="flex-1 px-3">
            <ul className="space-y-1">
              {searchHistory.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => handleNavigation(`history/${item.id}`)}
                  >
                    <div className="flex items-start">
                      <Clock
                        size={16}
                        className="mr-2 mt-0.5 flex-shrink-0 text-gray-500"
                      />
                      <div className="overflow-hidden">
                        <p className="truncate">{item.query}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}

      {/* User Profile */}
      <div className="mt-auto p-3">
        <Separator className="mb-3" />
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            isCollapsed && "justify-center",
          )}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <img
                src={userAvatar}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">Free Plan</p>
              </div>
            )}
          </div>
        </Button>

        {!isCollapsed && (
          <div className="mt-2 flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300"
              onClick={() => handleNavigation("profile")}
            >
              <User size={14} className="mr-1" />
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300"
              onClick={() => handleNavigation("help")}
            >
              <MessageSquare size={14} className="mr-1" />
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs text-gray-700 dark:text-gray-300"
              onClick={() => handleNavigation("logout")}
            >
              <LogOut size={14} className="mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
