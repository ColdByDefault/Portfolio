
/**
 * BeRichLayout is a React functional component that serves as the layout for the "BeRich" section of the application.
 * It wraps its children with a theme provider and a sidebar provider, enabling theme management and sidebar functionality.
 *
 * @ param {Object} props - The props object.
 * @ param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @ returns {JSX.Element} The layout component with a theme provider, sidebar functionality, and a main content area.
 *
 * @ remarks
 * - The `ThemeProvider` is configured to use the system theme by default and disables transitions on theme changes.
 * - The `SidebarProvider` manages the state and behavior of the sidebar.
 * - The `AppSidebar` component renders the sidebar, and the `SidebarTrigger` provides a trigger button for toggling it.
 * - The `main` element is styled to allow scrolling and includes padding for proper spacing.
 */
"use client"
import type React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/berich/sidebar"
import { AppSidebar } from "@/components/berich/app-sidebar"
import { ThemeProvider } from "@/components/berich/theme-provide"
import "@/styles/berich.css"
import { CookieBanner } from "@/components/main/cookie-banner"





export default function BeRichLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CookieBanner /> 
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="absolute lg:relative left-3 top-1" />
          <main className="max-w-screen lg:w-full mt-12">{children}</main>
        </SidebarProvider>
      </ThemeProvider>
  )
}

