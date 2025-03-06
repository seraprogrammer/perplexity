import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Share2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MessageSquare,
  RefreshCw,
  Loader2,
} from "lucide-react";
// ReactMarkdown removed to fix errors
import { getGeminiAPI } from "../api/gemini";
import ApiKeyModal from "../settings/ApiKeyModal";

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
}

const ChatInterface = ({ onSendMessage = () => {} }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([
    {
      role: "model",
      content:
        "Hello! I'm an AI assistant. Ask me anything, and I'll do my best to help you.",
    },
  ]);

  useEffect(() => {
    // Load API key from localStorage when component mounts
    const savedApiKey = localStorage.getItem("perplexity_api_key") || "";
    setApiKey(savedApiKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!apiKey) {
      alert("Please set your API key first");
      return;
    }

    // Add user message to conversation
    const userMessage = { role: "user", content: message };
    setConversation((prev) => [...prev, userMessage]);
    onSendMessage(message);
    setMessage("");
    setIsLoading(true);

    try {
      // Simulate API response instead of using Gemini
      const response = `I'm simulating a response to your query: "${message}". This is a placeholder response since we're not using an external API.`;

      // Add AI response to conversation
      setConversation((prev) => [
        ...prev,
        { role: "model", content: response },
      ]);
    } catch (error) {
      console.error("Error getting response from API:", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "Sorry, I encountered an error. Please check your API key or try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySave = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="flex-1 overflow-auto p-4 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          {/* Messages */}
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`mb-8 ${msg.role === "user" ? "ml-12" : "mr-12"}`}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${msg.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}
                >
                  <span className="text-white font-bold">
                    {msg.role === "user" ? "U" : "A"}
                  </span>
                </div>
                <h2 className="text-lg font-medium text-gray-300">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </h2>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-gray-700 backdrop-blur-md shadow-lg shadow-black/20 text-white">
                <div className="prose prose-invert max-w-none">
                  {msg.content.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {msg.role === "model" && (
                <div className="flex items-center justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                    onClick={() => handleCopyMessage(msg.content)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animation-delay-200"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animation-delay-400"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-800 p-4 backdrop-blur-md bg-black/40">
        <div className="max-w-3xl mx-auto flex items-center">
          <ApiKeyModal onSave={handleApiKeySave} initialApiKey={apiKey} />

          <form onSubmit={handleSubmit} className="flex-1 ml-2 relative">
            <div className="relative flex items-center">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question..."
                className="pr-10 py-6 h-12 text-base rounded-full border-2 border-gray-700 bg-black/50 text-white focus:border-blue-500 placeholder:text-gray-500"
              />
              <div className="absolute right-3">
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-8 w-8 shadow-md shadow-black/50"
                  disabled={!message.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {!apiKey && (
          <div className="max-w-3xl mx-auto mt-2 text-xs text-blue-400 text-center">
            Please set your API key using the settings button to enable AI
            responses
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
