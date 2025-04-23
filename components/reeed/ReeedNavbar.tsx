"use client"

import Link from "next/link"
import { Github, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function ReeedNavbar() {
  const { setTheme, theme } = useTheme()

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur ${theme === "dark" ? "dark bg-background/95" : "light bg-background/95"}`}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/reeed" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block p-4">reeed v1.0.0</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`pr-0 ${theme === "dark" ? "dark" : "light"}`}>
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center">
            <Link href="#" className="px-4 py-2 text-sm font-medium">
              Files
            </Link>
          </nav>
          <div className="flex items-center space-x-1">
            <Link href="https://github.com/ColdByDefault/Portfolio-beRichHub" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`${theme === "dark" ? "dark" : "light"}`}>
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col space-y-3 pt-4 ${theme === "dark" ? "dark" : "light"}`}>
      <Link href="#" className="px-4 py-2 text-sm font-medium">
        Files
      </Link>
    </div>
  )
}
