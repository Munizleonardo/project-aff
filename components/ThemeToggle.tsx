"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldUseLight = window.localStorage.getItem("techparks-theme") === "light";
    document.documentElement.classList.toggle("light-mode", shouldUseLight);
    return shouldUseLight;
  });

  function toggleTheme() {
    const nextTheme = !isLight;
    document.documentElement.classList.toggle("light-mode", nextTheme);
    window.localStorage.setItem("techparks-theme", nextTheme ? "light" : "dark");
    setIsLight(nextTheme);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className="text-white hover:bg-white hover:text-slate-950"
      aria-label={isLight ? "Ativar modo escuro" : "Ativar modo claro"}
      onClick={toggleTheme}
    >
      {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
