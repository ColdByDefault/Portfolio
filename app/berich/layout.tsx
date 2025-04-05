"use client"
import type React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/berich/sidebar"
import { AppSidebar } from "@/components/berich/app-sidebar"
import { ThemeProvider } from "@/components/berich/theme-provide"
import "@/styles/berich.css"




export default function BeRichLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="ml-3 mt-3" />
          <main className="flex-1 overflow-auto p-8 pt-16">{children}</main>
        </SidebarProvider>
      </ThemeProvider>
  )
}

