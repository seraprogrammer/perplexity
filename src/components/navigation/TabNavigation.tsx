import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Search,
  Image,
  Video,
  FileText,
  Globe,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  tabs?: TabItem[];
}

const TabNavigation = ({
  activeTab = "web",
  onTabChange = () => {},
  tabs = [
    { id: "web", label: "Web", icon: <Globe className="h-4 w-4 mr-2" /> },
    { id: "images", label: "Images", icon: <Image className="h-4 w-4 mr-2" /> },
    { id: "videos", label: "Videos", icon: <Video className="h-4 w-4 mr-2" /> },
    { id: "news", label: "News", icon: <FileText className="h-4 w-4 mr-2" /> },
    {
      id: "academic",
      label: "Academic",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      id: "social",
      label: "Social",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
  ],
}: TabNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="w-full bg-background py-2 border-b border-border sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 overflow-x-auto hide-scrollbar">
            <Tabs
              value={selectedTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="bg-transparent p-0 h-auto w-full flex justify-start space-x-1 overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`flex items-center px-3 py-2 rounded-full text-sm transition-colors ${
                      selectedTab === tab.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="ml-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              Search tools
            </Button>
          </div>
        </div>
      </div>

      {/* Add responsive styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TabNavigation;
