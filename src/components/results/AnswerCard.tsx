import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  MessageSquare,
} from "lucide-react";

interface Source {
  title: string;
  url: string;
  favicon?: string;
}

interface FollowUpQuestion {
  id: string;
  text: string;
}

interface AnswerCardProps {
  answer?: string;
  sources?: Source[];
  followUpQuestions?: FollowUpQuestion[];
  isLoading?: boolean;
  onFollowUpClick?: (question: string) => void;
}

const AnswerCard = ({
  answer = "Perplexity AI is a search engine that uses artificial intelligence to answer questions and provide information. It combines the capabilities of large language models with web search to deliver comprehensive answers with citations. Unlike traditional search engines that return a list of links, Perplexity aims to directly answer questions by synthesizing information from multiple sources and providing references to those sources.",
  sources = [
    {
      title: "Perplexity AI - Wikipedia",
      url: "https://en.wikipedia.org/wiki/Perplexity_AI",
      favicon: "https://www.google.com/s2/favicons?domain=wikipedia.org",
    },
    {
      title: "What is Perplexity AI? Everything you need to know",
      url: "https://www.techradar.com/computing/artificial-intelligence/what-is-perplexity-ai",
      favicon: "https://www.google.com/s2/favicons?domain=techradar.com",
    },
    {
      title:
        "Perplexity AI Review: The Search Engine That Answers Your Questions",
      url: "https://www.nytimes.com/2023/12/27/technology/personaltech/perplexity-ai-review.html",
      favicon: "https://www.google.com/s2/favicons?domain=nytimes.com",
    },
  ],
  followUpQuestions = [
    { id: "1", text: "How does Perplexity AI compare to ChatGPT?" },
    { id: "2", text: "What are the main features of Perplexity AI?" },
    { id: "3", text: "Is Perplexity AI free to use?" },
  ],
  isLoading = false,
  onFollowUpClick = () => {},
}: AnswerCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (text: string) => {
    // This is a simple implementation - in a real app you would use a markdown parser
    const paragraphs = text.split("\n\n");
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-800">
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white border-gray-200">
      {isLoading ? (
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-60">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-500">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-600">Generating answer...</p>
        </CardContent>
      ) : (
        <>
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-medium text-gray-900">
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-blue max-w-none">
              {renderMarkdown(answer)}
            </div>

            {sources && sources.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Sources
                </h3>
                <div className="space-y-2">
                  {sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {source.favicon && (
                        <img
                          src={source.favicon}
                          alt=""
                          className="w-4 h-4 mr-2"
                        />
                      )}
                      <span className="text-sm text-blue-600 hover:underline">
                        {source.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {followUpQuestions && followUpQuestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Follow-up questions
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {followUpQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => onFollowUpClick(question.text)}
                      className="text-left p-3 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Not helpful</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={handleCopy}
                    >
                      <Copy
                        className={cn(
                          "h-4 w-4",
                          copied ? "text-green-500" : "",
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy answer"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Provide feedback</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default AnswerCard;
