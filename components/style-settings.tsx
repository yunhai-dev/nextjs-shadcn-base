"use client";

import { Settings2, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  useLayoutSettings,
  type SidebarStyle,
  type LayoutMode,
} from "@/components/layout-settings-context";

const themes = [
  { label: "亮色", value: "light", icon: Sun },
  { label: "暗色", value: "dark", icon: Moon },
  { label: "跟随系统", value: "system", icon: Monitor },
];

const sidebarStyles: { label: string; value: SidebarStyle }[] = [
  { label: "内嵌式", value: "inset" },
  { label: "浮动", value: "floating" },
  { label: "侧边栏", value: "default" },
];

const layoutModes: { label: string; value: LayoutMode }[] = [
  { label: "默认", value: "expanded" },
  { label: "紧凑", value: "collapsed" },
  { label: "铺满", value: "hidden" },
];

function MiniSidebar({
  wide,
  floating,
  children,
}: {
  wide?: boolean;
  floating?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-1 shrink-0",
        wide ? "w-9" : "w-3.5",
        floating
          ? "my-0.5 ml-0.5 rounded border bg-background shadow-sm self-stretch"
          : "bg-sidebar border-r border-border",
      )}
    >
      {/* logo */}
      <div className="flex items-center gap-0.5 mb-0.5">
        <div className="size-1.5 shrink-0 rounded-sm bg-foreground/40" />
        {wide && <div className="h-1 flex-1 rounded-full bg-foreground/20" />}
      </div>
      {/* nav items */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-0.5">
          <div className="size-1 shrink-0 rounded-sm bg-foreground/25" />
          {wide && <div className="h-0.5 flex-1 rounded-full bg-foreground/15" />}
        </div>
      ))}
      {children}
    </div>
  );
}

function MiniContent({ inset, children }: { inset?: boolean; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-1 min-w-0 overflow-hidden",
        inset ? "m-0.5 rounded border bg-background shadow-sm p-1" : "p-1",
      )}
    >
      {/* header bar */}
      <div className="flex items-center gap-0.5 border-b border-border/50 pb-0.5 mb-0.5">
        <div className="h-0.5 w-5 rounded-full bg-foreground/20" />
        <div className="ml-auto h-0.5 w-2 rounded-full bg-foreground/15" />
      </div>
      {/* single content block */}
      <div className="flex-1 rounded-sm bg-foreground/10 p-1 overflow-hidden">
        <div className="h-0.5 w-8 rounded-full bg-foreground/25 mb-1" />
        <div className="h-0.5 w-6 rounded-full bg-foreground/15" />
      </div>
      {children}
    </div>
  );
}

function SidebarStylePreview({ value }: { value: SidebarStyle }) {
  return (
    <div className="flex h-16 w-full overflow-hidden rounded-md border bg-muted/20">
      <MiniSidebar wide floating={value === "floating"} />
      <MiniContent inset={value === "inset"} />
    </div>
  );
}

function LayoutModePreview({ value }: { value: LayoutMode }) {
  return (
    <div className="flex h-16 w-full overflow-hidden rounded-md border bg-muted/20">
      {value !== "hidden" && <MiniSidebar wide={value === "expanded"} />}
      <MiniContent />
    </div>
  );
}

export function StyleSettings() {
  const { theme, setTheme } = useTheme();
  const {
    sidebarStyle,
    setSidebarStyle,
    layoutMode,
    setLayoutMode,
    styleSettingsOpen,
    setStyleSettingsOpen,
  } = useLayoutSettings();

  return (
    <Sheet open={styleSettingsOpen} onOpenChange={setStyleSettingsOpen}>
      <SheetContent className="w-80 flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>样式设置</SheetTitle>
          <p className="text-sm text-muted-foreground">自定义界面主题、侧边栏与布局风格。</p>
        </SheetHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-6">
          {/* Theme */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">主题</p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-2 text-xs transition-colors hover:bg-accent",
                    theme === value ? "border-primary bg-accent" : "border-transparent bg-muted",
                  )}
                >
                  {/* Mini browser preview */}
                  <div
                    className={cn(
                      "flex h-16 w-full flex-col overflow-hidden rounded-md border",
                      value === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200",
                    )}
                  >
                    {/* Header */}
                    <div
                      className={cn(
                        "flex items-center gap-0.5 border-b px-1.5 py-1",
                        value === "dark"
                          ? "border-zinc-700 bg-zinc-800"
                          : "border-zinc-100 bg-zinc-50",
                      )}
                    >
                      <div
                        className={cn(
                          "h-0.5 w-5 rounded-full",
                          value === "dark" ? "bg-zinc-600" : "bg-zinc-300",
                        )}
                      />
                      <div
                        className={cn(
                          "ml-auto size-1.5 rounded-full",
                          value === "dark" ? "bg-zinc-600" : "bg-zinc-300",
                        )}
                      />
                    </div>
                    {/* Body */}
                    <div className="flex flex-1 gap-0.5 p-1">
                      {/* Sidebar */}
                      <div
                        className={cn(
                          "flex w-5 shrink-0 flex-col gap-0.5 rounded-sm p-0.5",
                          value === "dark" ? "bg-zinc-800" : "bg-zinc-100",
                        )}
                      >
                        <div
                          className={cn(
                            "size-1.5 rounded-sm",
                            value === "dark" ? "bg-zinc-600" : "bg-zinc-300",
                          )}
                        />
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-0.5 rounded-full",
                              value === "dark" ? "bg-zinc-700" : "bg-zinc-200",
                            )}
                          />
                        ))}
                      </div>
                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <div
                          className={cn(
                            "h-2 rounded-sm",
                            value === "dark" ? "bg-zinc-700" : "bg-zinc-100",
                          )}
                        />
                        <div
                          className={cn(
                            "flex-1 rounded-sm",
                            value === "dark" ? "bg-zinc-800" : "bg-zinc-50",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1">
                    <Icon className="size-3" />
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar style */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">侧边栏</p>
            <div className="grid grid-cols-3 gap-2">
              {sidebarStyles.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSidebarStyle(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-2 text-xs transition-colors hover:bg-accent",
                    sidebarStyle === value
                      ? "border-primary bg-accent"
                      : "border-transparent bg-muted",
                  )}
                >
                  <SidebarStylePreview value={value} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">布局</p>
            <div className="grid grid-cols-3 gap-2">
              {layoutModes.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setLayoutMode(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-2 text-xs transition-colors hover:bg-accent",
                    layoutMode === value
                      ? "border-primary bg-accent"
                      : "border-transparent bg-muted",
                  )}
                >
                  <LayoutModePreview value={value} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
