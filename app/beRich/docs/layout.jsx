'use client';
import SidebarNav from '@components/ui/sidebarTest';

export default function DocsLayout({ children }) {
  return (
    <div className="h-screen bg-transparent text-white flex">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 pt-24">
        {children}
      </main>
    </div>
  );
}
