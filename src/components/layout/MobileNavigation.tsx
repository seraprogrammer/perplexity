import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Search,
  Home,
  Settings,
  History,
  LogIn,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  onMenuToggle?: () => void;
  isAuthenticated?: boolean;
}

const MobileNavigation = ({
  onMenuToggle = () => {},
  isAuthenticated = false,
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      onMenuToggle();
    }
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col h-full bg-white dark:bg-gray-900">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="text-lg font-semibold">Perplexity</span>
                </div>
              </div>

              <div className="flex-1 overflow-auto py-2">
                <nav className="space-y-1 px-2">
                  <NavItem
                    icon={<Home className="h-5 w-5" />}
                    label="Home"
                    active
                  />
                  <NavItem
                    icon={<Search className="h-5 w-5" />}
                    label="Search"
                  />
                  <NavItem
                    icon={<History className="h-5 w-5" />}
                    label="History"
                  />
                  <NavItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                  />
                  <NavItem
                    icon={<HelpCircle className="h-5 w-5" />}
                    label="Help & FAQ"
                  />
                </nav>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                {isAuthenticated ? (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        alt="User avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">User Name</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        user@example.com
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-lg font-semibold hidden sm:inline-block">
            Perplexity
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400"
        >
          <Search className="h-5 w-5" />
        </Button>
        {isAuthenticated ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              alt="User avatar"
              className="w-full h-full rounded-full"
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  active = false,
  onClick = () => {},
}: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors",
        active
          ? "bg-purple-50 text-purple-600 dark:bg-gray-800 dark:text-purple-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      )}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

export default MobileNavigation;
