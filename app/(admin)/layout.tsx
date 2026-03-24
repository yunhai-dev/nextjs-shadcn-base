"use client";

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

const collapsibleMap: Record<LayoutMode, "icon" | "offcanvas"> = {
  expanded: "offcanvas",
  collapsed: "icon",
  hidden: "offcanvas",
};

const defaultOpenMap: Record<LayoutMode, boolean> = {
  expanded: true,
  collapsed: false,
  hidden: false,
};

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { sidebarStyle, layoutMode } = useLayoutSettings();

  return (
    <SidebarProvider defaultOpen={defaultOpenMap[layoutMode]}>
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
