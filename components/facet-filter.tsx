"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

interface FacetFilterProps {
  label: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
  searchPlaceholder?: string;
}

export function FacetFilter({
  label,
  options,
  selected,
  onToggle,
  onClear,
  searchPlaceholder,
}: FacetFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 rounded-md border border-dashed px-3 h-9 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <CirclePlus className="size-3.5" />
          <span>{label}</span>
          {selected.size > 0 && (
            <>
              <div className="w-px h-3.5 bg-border mx-1" />
              {selected.size > 2 ? (
                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                  已选 {selected.size} 项
                </span>
              ) : (
                Array.from(selected).map((v) => (
                  <span key={v} className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium">
                    {v}
                  </span>
                ))
              )}
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder ?? `搜索${label}...`} />
          <CommandList>
            <CommandEmpty>无匹配结果</CommandEmpty>
            <CommandGroup>
              {options.map((v) => (
                <CommandItem key={v} value={v} onSelect={() => onToggle(v)}>
                  <Checkbox checked={selected.has(v)} className="mr-2" aria-hidden />
                  {v}
                </CommandItem>
              ))}
            </CommandGroup>
            {selected.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={onClear} className="justify-center">
                    <span className="flex-1 text-center text-muted-foreground">清空筛选</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
