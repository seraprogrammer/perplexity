import React, { useState } from "react";
import SearchBar from "@/components/search/SearchBar";
import TabNavigation from "@/components/navigation/TabNavigation";
import AnswerCard from "@/components/results/AnswerCard";

interface MainContentProps {
  isSidebarExpanded?: boolean;
  onSearch?: (query: string) => void;
  isProcessingQuery?: boolean;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const MainContent = ({
  isSidebarExpanded = true,
  onSearch = () => {},
  isProcessingQuery = false,
  activeTab = "web",
  onTabChange = () => {},
}: MainContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
    onSearch(query);
  };

  const handleFollowUpClick = (question: string) => {
    setSearchQuery(question);
    onSearch(question);
  };

  return (
    <main
      className={`flex-1 min-h-screen bg-background transition-all duration-300`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          {/* Logo and branding */}
          {!showResults && (
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-purple-600 mb-2">
                Perplexity
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered search engine
              </p>
            </div>
          )}

          {/* Search bar */}
          <div className={`w-full ${showResults ? "max-w-3xl" : "max-w-2xl"}`}>
            <SearchBar
              onSearch={handleSearch}
              initialQuery={searchQuery}
              isProcessing={isProcessingQuery}
            />
          </div>

          {/* Tab navigation - only show when results are displayed */}
          {showResults && (
            <div className="w-full mt-6">
              <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          )}

          {/* Results area */}
          {showResults && (
            <div className="w-full mt-6">
              <AnswerCard
                isLoading={isProcessingQuery}
                onFollowUpClick={handleFollowUpClick}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2023 Perplexity AI Clone. This is a demo project.</p>
        </footer>
      </div>
    </main>
  );
};

export default MainContent;
