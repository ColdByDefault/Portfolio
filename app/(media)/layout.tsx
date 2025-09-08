/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
'use client';
import { QuickActions } from "@/components/quickActions";
import { Background } from "@/components/visuals";

export default function MediaGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <QuickActions />
      {children}
      <Background />
    </div>
  );
}
