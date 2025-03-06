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
  Sparkles,
} from "lucide-react";

interface ChatLayoutProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const ChatLayout = ({
  isSidebarCollapsed = false,
  onToggleSidebar = () => {},
}: ChatLayoutProps) => {
  const [activeTab, setActiveTab] = useState("gemini");

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900">
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

        {/* Action buttons */}
        <div className="border-b border-green-900/50 py-2 px-4 backdrop-blur-md bg-black/30">
          <div className="max-w-3xl mx-auto flex items-center space-x-2 overflow-x-auto hide-scrollbar">
            <ActionButton
              icon={<Sparkles className="h-4 w-4 mr-2" />}
              label="Gemini AI"
              isActive={activeTab === "gemini"}
              onClick={() => setActiveTab("gemini")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
            <ActionButton
              icon={<Search className="h-4 w-4 mr-2" />}
              label="Web Search"
              isActive={activeTab === "web"}
              onClick={() => setActiveTab("web")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
            <ActionButton
              icon={<Image className="h-4 w-4 mr-2" />}
              label="Images"
              isActive={activeTab === "images"}
              onClick={() => setActiveTab("images")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
            <ActionButton
              icon={<Video className="h-4 w-4 mr-2" />}
              label="Videos"
              isActive={activeTab === "videos"}
              onClick={() => setActiveTab("videos")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
            <ActionButton
              icon={<FileText className="h-4 w-4 mr-2" />}
              label="News"
              isActive={activeTab === "news"}
              onClick={() => setActiveTab("news")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
            <ActionButton
              icon={<BookOpen className="h-4 w-4 mr-2" />}
              label="Academic"
              isActive={activeTab === "academic"}
              onClick={() => setActiveTab("academic")}
              activeClass="bg-green-900/50 text-green-400 font-medium border border-green-500/30"
            />
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface onSendMessage={handleSendMessage} />
        </div>
      </div>

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
      className={`flex items-center px-3 py-2 rounded-full text-sm transition-colors ${isActive ? activeClass : "text-gray-400 hover:bg-green-900/30 hover:text-green-300"}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default ChatLayout;
