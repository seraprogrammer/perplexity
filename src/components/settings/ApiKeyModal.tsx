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
    const savedApiKey = localStorage.getItem("perplexity_api_key") || "";
    setApiKey(savedApiKey);
  }, []);

  const handleSave = () => {
    // Save API key to localStorage
    localStorage.setItem("perplexity_api_key", apiKey);
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
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-black/30 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-blue-400">API Settings</DialogTitle>
          <DialogDescription className="text-gray-300">
            Enter your API key to enable AI responses.
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
              placeholder="Enter your API key"
              className="col-span-3 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-400"
            />
          </div>
          <div className="col-span-4 text-xs text-gray-400 mt-2">
            <p>Enter your API key to enable AI responses</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50"
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
