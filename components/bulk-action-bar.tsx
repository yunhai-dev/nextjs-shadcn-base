"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface BulkAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
}

interface BulkActionBarProps {
  count: number;
  actions: BulkAction[];
  onClear: () => void;
}

export function BulkActionBar({ count, actions, onClear }: BulkActionBarProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border bg-background/95 backdrop-blur-sm px-3 py-1.5 shadow-lg">
      <Button variant="ghost" size="icon" className="size-7" onClick={onClear}>
        <X className="size-4" />
      </Button>
      <div className="h-4 w-px bg-border" />
      <span className="text-sm font-medium">已选择 {count} 项</span>
      <div className="h-4 w-px bg-border" />
      {actions.map((action, i) => (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <Button
              variant={action.variant ?? "outline"}
              size="icon"
              className={action.className ?? "size-7"}
              onClick={action.onClick}
            >
              {action.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
