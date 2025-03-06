import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  initialApiKey?: string;
}

const ApiKeyModal = ({ onSave, initialApiKey = "" }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load API key from localStorage when component mounts
    const savedApiKey = localStorage.getItem("gemini_api_key") || "";
    setApiKey(savedApiKey);
  }, []);

  const handleSave = () => {
    // Save API key to localStorage
    localStorage.setItem("gemini_api_key", apiKey);
    onSave(apiKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-black/30 border border-green-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-green-400">
            Gemini API Settings
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Enter your Gemini API key to enable AI responses.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right text-gray-300">
              API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="col-span-3 bg-black/50 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400"
            />
          </div>
          <div className="col-span-4 text-xs text-gray-400 mt-2">
            <p>Get your API key from the Google AI Studio:</p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              https://aistudio.google.com/app/apikey
            </a>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white border border-green-500/50"
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
