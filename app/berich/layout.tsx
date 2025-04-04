import "@/styles/berich.css"
import { SidebarProvider, SidebarTrigger } from "@/components/berich/sidebar"
import { AppSidebar } from "@/components/berich/app-sidebar"

export default function BeRichRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="ml-3 mt-3" />
        <main className="flex-1 overflow-auto p-8 pt-16">{children}</main>
      </SidebarProvider>
  )
}