import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoreHorizontal, Share, Sparkles } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onBack?: () => void;
  onShare?: () => void;
  onMore?: () => void;
}

const Header = ({
  userName = "olovajs16810",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=olovajs",
  onBack = () => {},
  onShare = () => {},
  onMore = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-12 backdrop-blur-md bg-black/30 border-b border-green-900/50 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-2 text-green-400 hover:text-green-300 hover:bg-green-900/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-800 overflow-hidden mr-2 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-green-300" />
          </div>
          <span className="text-sm font-medium text-green-400">
            Gemini Chat
          </span>
          <span className="text-xs text-green-600 ml-2">
            Powered by Google AI
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-green-400 hover:text-green-300 hover:bg-green-900/30 border border-green-500/20"
        >
          + New Chat
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMore}
          className="text-green-400 hover:text-green-300 hover:bg-green-900/30"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button
          onClick={onShare}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1 text-xs border border-green-500/50 shadow-md shadow-green-900/50"
        >
          <Share className="h-3 w-3 mr-1" />
          Share
        </Button>
      </div>
    </header>
  );
};

export default Header;
