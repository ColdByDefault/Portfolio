"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"

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




const navItems = [
  { title: "Getting Started with Next.js 15", url: "/berich/getting-started" },
  { title: "test", url: "/berich/test" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear();

  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <div>
      <div className="absolute top-5 left-1/2">
        <DynamicBreadcrumb items={breadcrumbs} />
      </div>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/berich">
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
                <Input id="search" placeholder="Search the docs..." className="pl-8" />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
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
            <span className="text-sm text-muted-foreground">© {currentYear} Docs</span>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

