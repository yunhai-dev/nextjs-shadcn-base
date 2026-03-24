"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type SidebarStyle = "default" | "inset" | "floating";
export type LayoutMode = "expanded" | "collapsed" | "hidden";

type LayoutSettings = {
  sidebarStyle: SidebarStyle;
  setSidebarStyle: (v: SidebarStyle) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (v: LayoutMode) => void;
  prevLayoutMode: Exclude<LayoutMode, "hidden">;
  styleSettingsOpen: boolean;
  setStyleSettingsOpen: (v: boolean) => void;
};

const LayoutSettingsContext = createContext<LayoutSettings>({
  sidebarStyle: "default",
  setSidebarStyle: () => {},
  layoutMode: "expanded",
  setLayoutMode: () => {},
  prevLayoutMode: "expanded",
  styleSettingsOpen: false,
  setStyleSettingsOpen: () => {},
});

export function LayoutSettingsProvider({ children }: { children: React.ReactNode }) {
  const [sidebarStyle, setSidebarStyleState] = useState<SidebarStyle>("default");
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>("expanded");
  const [prevLayoutMode, setPrevLayoutMode] = useState<Exclude<LayoutMode, "hidden">>("expanded");
  const [styleSettingsOpen, setStyleSettingsOpen] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("sidebarStyle") as SidebarStyle | null;
    const l = localStorage.getItem("layoutMode") as LayoutMode | null;
    const p = localStorage.getItem("prevLayoutMode") as Exclude<LayoutMode, "hidden"> | null;
    if (s) setSidebarStyleState(s);
    if (l) setLayoutModeState(l);
    if (p) setPrevLayoutMode(p);
  }, []);

  const setSidebarStyle = (v: SidebarStyle) => {
    setSidebarStyleState(v);
    localStorage.setItem("sidebarStyle", v);
  };

  const setLayoutMode = (v: LayoutMode) => {
    if (v !== "hidden") {
      setPrevLayoutMode(v);
      localStorage.setItem("prevLayoutMode", v);
    }
    setLayoutModeState(v);
    localStorage.setItem("layoutMode", v);
  };

  return (
    <LayoutSettingsContext.Provider
      value={{
        sidebarStyle,
        setSidebarStyle,
        layoutMode,
        setLayoutMode,
        prevLayoutMode,
        styleSettingsOpen,
        setStyleSettingsOpen,
      }}
    >
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings() {
  return useContext(LayoutSettingsContext);
}
