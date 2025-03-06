import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatInterface from "../chat/ChatInterface";
import { Button } from "@/components/ui/button";
import {
  Search,
  Image,
  Video,
  FileText,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface ChatLayoutProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const ChatLayout = ({
  isSidebarCollapsed = false,
  onToggleSidebar = () => {},
}: ChatLayoutProps) => {
  const [activeTab, setActiveTab] = useState("web");

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={onToggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden backdrop-blur-sm">
        <Header />

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Styles moved to index.css */}
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  activeClass?: string;
}

const ActionButton = ({
  icon,
  label,
  isActive = false,
  onClick = () => {},
  activeClass = "bg-primary/10 text-primary font-medium",
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-full text-sm transition-colors ${isActive ? activeClass : "text-gray-400 hover:bg-blue-900/30 hover:text-blue-300"}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default ChatLayout;
