"use client";

import { useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  LayoutSettingsProvider,
  useLayoutSettings,
  type LayoutMode,
} from "@/components/layout-settings-context";
import { StyleSettings } from "@/components/style-settings";
import { cn } from "@/lib/utils";

// layoutMode → sidebar collapsible type
const collapsibleMap: Record<LayoutMode, "icon" | "offcanvas"> = {
  expanded: "offcanvas",
  collapsed: "icon",
  hidden: "offcanvas",
};

// layoutMode → sidebar open state
const openMap: Record<LayoutMode, boolean> = {
  expanded: true,
  collapsed: false,
  hidden: false,
};

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { sidebarStyle, layoutMode, setLayoutMode } = useLayoutSettings();

  // Sync SidebarTrigger toggle back to layoutMode:
  // expanded(open=true)  → trigger closes → collapsed(open=false)
  // collapsed(open=false) → trigger opens  → expanded(open=true)
  // hidden uses custom button, SidebarProvider open stays false
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (layoutMode === "expanded" && !open) {
        setLayoutMode("collapsed");
      } else if (layoutMode === "collapsed" && open) {
        setLayoutMode("expanded");
      }
    },
    [layoutMode, setLayoutMode],
  );

  return (
    <SidebarProvider open={openMap[layoutMode]} onOpenChange={handleOpenChange}>
      <AppSidebar collapsible={collapsibleMap[layoutMode]} />
      <SidebarInset
        className={cn(
          sidebarStyle === "inset" &&
            "m-2 rounded-xl overflow-hidden h-[calc(100svh-1rem)] flex flex-col",
        )}
      >
        <AppHeader />
        <main
          className={cn(
            "flex flex-1 flex-col gap-4 p-4",
            sidebarStyle === "inset" && "overflow-y-auto",
          )}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutSettingsProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
      <StyleSettings />
    </LayoutSettingsProvider>
  );
}
