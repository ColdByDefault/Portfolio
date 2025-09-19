"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="bg-transparent border-0 cursor-pointer"
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle theme"
          aria-expanded="false"
          className="hover:text-sky-600 transition-colors duration-300"
        >
          <Sun
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            aria-hidden="true"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            aria-hidden="true"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Theme selection menu">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          aria-label="Switch to light theme"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark theme"
        >
          Classic
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          aria-label="Use system theme"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
