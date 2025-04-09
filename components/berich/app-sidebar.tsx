"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Code2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/berich/sidebar"
import { DynamicBreadcrumb } from "@/components/berich/dynamic-breadcrumb"
import { generateBreadcrumbs } from "@/lib/breadcrumb-utils"
import { useTheme } from "next-themes"





const navItems = [
  { title: "Getting Started Roadmap", url: "/berichHub/getting-started-roadmap" },
  { title: "Getting Started PC", url: "/berichHub/getting-started-pc" },
  { title: "Getting Started Networking", url: "/berichHub/getting-started-network" },
  { title: "Getting Started Python 1", url: "/berichHub/getting-started-python-1" },
  { title: "Getting Started Python 2", url: "/berichHub/getting-started-python-2" },
  { title: "Getting Started Git & GitHub", url: "/berichHub/getting-started-git" },
  { title: "Getting Started with React", url: "/berichHub/getting-started-react" },
  { title: "Getting Started with Next.js", url: "/berichHub/getting-started-next" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear();

  

  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <div>
      <div className="absolute left-1/4 top-5 lg:left-2/5">
        <DynamicBreadcrumb items={breadcrumbs} />
      </div>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/berichHub">
                  <div className="bg-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/logoBlack.png"
                      alt="beRich Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 bg-white"/>
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">beRich.Hub</span>
                    <span className="">v4.0.0</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between px-4 py-2">
            <Code2 className="h-6 w-6" />
            <span className="text-sm text-muted-foreground">© {currentYear} Docs</span>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

