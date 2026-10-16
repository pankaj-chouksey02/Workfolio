"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type LayoutOption = "masonry" | "columns" | "grid";

export interface CustomizationState {
  typography: "serif" | "sans";
  fontScale: number;
  fontFamilySans: string;
  fontFamilySerif: string;
  colorPalette: string;
  accent: string;
  darkMode: boolean;
  spacing: "compact" | "comfortable" | "airy";
  layout: LayoutOption;
  imageFilter: string;
  shadowsEnabled: boolean;
  reducedMotion: boolean;
  showHeader: boolean;
  cardBorders: boolean;
}

const STORAGE_KEY = "customization:v1";

const defaultState: CustomizationState = {
  typography: "serif",
  fontScale: 1,
  fontFamilySans: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
  fontFamilySerif: "Georgia, 'Times New Roman', serif",
  colorPalette: "terracotta",
  accent: "#C86D4B",
  darkMode: false,
  spacing: "comfortable",
  layout: "columns",
  imageFilter: "none",
  shadowsEnabled: true,
  reducedMotion: false,
  showHeader: true,
  cardBorders: true,
};

interface CustomizationContextValue {
  settings: CustomizationState;
  setSettings: (patch: Partial<CustomizationState>) => void;
  reset: () => void;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(null);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<CustomizationState>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return defaultState;
      return { ...defaultState, ...(JSON.parse(raw) as Partial<CustomizationState>) };
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.style.setProperty("--accent", settings.accent);
      root.style.setProperty("--bg", settings.darkMode ? "#0f1111" : "#FAF8F5");
      root.style.setProperty("--text", settings.darkMode ? "#F3F2F0" : "#141413");
      root.style.setProperty("--font-scale", String(settings.fontScale));
      root.style.setProperty("--img-filter", settings.imageFilter || "none");
      const gap = settings.spacing === "compact" ? "0.5rem" : settings.spacing === "airy" ? "2rem" : "1rem";
      root.style.setProperty("--gap", gap);
      root.style.setProperty("--layout", settings.layout);
      root.style.setProperty("--font-sans", settings.fontFamilySans);
      root.style.setProperty("--font-serif", settings.fontFamilySerif);
      root.style.setProperty("--card-shadow", settings.shadowsEnabled ? "0 10px 30px rgba(17,16,15,0.08)" : "none");
      root.style.setProperty("--card-border-color", settings.cardBorders ? "#E7E4DF" : "transparent");
      if (settings.reducedMotion) document.documentElement.classList.add("reduced-motion");
      else document.documentElement.classList.remove("reduced-motion");
      if (settings.darkMode) document.documentElement.classList.add("theme-dark");
      else document.documentElement.classList.remove("theme-dark");
    } catch {
      // ignore
    }
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      setSettings: (patch: Partial<CustomizationState>) => setSettingsState((s) => ({ ...s, ...patch })),
      reset: () => setSettingsState(defaultState),
    }),
    [settings]
  );

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx) throw new Error("useCustomization must be used within CustomizationProvider");
  return ctx;
}

export default CustomizationProvider;
