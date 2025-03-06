import React from "react";
import { Button } from "./button";
import { PlusCircle } from "lucide-react";

interface NewThreadButtonProps {
  onClick?: () => void;
}

const NewThreadButton = ({ onClick = () => {} }: NewThreadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-background hover:bg-muted text-foreground border border-border rounded-full flex items-center gap-2 px-4 py-2 text-sm font-medium"
    >
      <PlusCircle className="h-4 w-4" />
      <span>New Thread</span>
      <span className="ml-2 text-xs text-muted-foreground">Ctrl+I</span>
    </Button>
  );
};

export default NewThreadButton;
