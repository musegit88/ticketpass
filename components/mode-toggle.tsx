"use client";

import * as React from "react";
import { MonitorDot, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border rounded-2xl flex items-center gap-1 px-2 py-1">
      <div
        onClick={() => setTheme("light")}
        className={cn(
          theme === "light"
            ? "border rounded-full"
            : "text-slate-500 border-none"
        )}
      >
        <Sun size={18} />
      </div>
      <div
        onClick={() => setTheme("dark")}
        className={cn(
          theme === "dark"
            ? "border rounded-full"
            : "text-slate-500 border-none"
        )}
      >
        <Moon size={18} />
      </div>
      <div
        onClick={() => setTheme("system")}
        className={cn(
          theme === "system"
            ? "border rounded-full"
            : "text-slate-500 border-none"
        )}
      >
        <MonitorDot size={18} />
      </div>
    </div>
  );
}
