'use client';
import SidebarNav from '@components/ui/sidebar-nav';


export default function DocsLayout({ children }) {
  return (
    <div className="h-screen bg-transparent text-white">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-8 overflow-y-auto h-screen scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
