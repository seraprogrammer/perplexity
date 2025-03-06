import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialQuery?: string;
  suggestions?: string[];
  isProcessing?: boolean;
}

const SearchBar = ({
  onSearch = () => {},
  initialQuery = "",
  suggestions = [
    "What is quantum computing?",
    "How does AI work?",
    "Latest news on climate change",
    "Best programming languages to learn in 2023",
    "Explain blockchain technology",
  ],
  isProcessing = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      // Navigate to chat interface
      navigate(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    // Navigate to chat interface
    navigate(`/chat?q=${encodeURIComponent(suggestion)}`);
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-background">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-500">
            <Search size={20} />
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            placeholder="Ask anything..."
            className="pl-10 pr-16 py-6 h-14 text-base rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 shadow-sm"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
          <div className="absolute right-3">
            {isProcessing ? (
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              </div>
            ) : (
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-purple-500 hover:bg-purple-600 text-white h-8 w-8"
                disabled={!query.trim()}
              >
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>

        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
            <ul>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      <div className="mt-3 flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-2"
        >
          <Mic size={16} />
          <span>Voice Search</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
