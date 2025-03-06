import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import MainContent from "./layout/MainContent";
import MobileNavigation from "./layout/MobileNavigation";
import Header from "./layout/Header";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("web");
  const [isProcessingQuery, setIsProcessingQuery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsProcessingQuery(true);

    // Simulate search processing
    setTimeout(() => {
      setIsProcessingQuery(false);
    }, 2000);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNavigation = (path: string) => {
    // Handle navigation logic here
    console.log(`Navigating to: ${path}`);

    // If navigating to home, reset the search
    if (path === "home") {
      setSearchQuery("");
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Mobile Navigation - only visible on mobile */}
        <div className="lg:hidden">
          <MobileNavigation onMenuToggle={() => {}} isAuthenticated={false} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <MainContent
            isSidebarExpanded={!sidebarCollapsed}
            onSearch={handleSearch}
            isProcessingQuery={isProcessingQuery}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
