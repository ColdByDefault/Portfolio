/**
 * Media Dashboard - Navigation hub for all media content
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { Home, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export function QuickActions() {
    return (
        // Quick Actions
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">
                <FileText className="h-4 w-4 mr-2" />
                Latest Posts
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">
                <User className="h-4 w-4 mr-2" />
                About Me
              </Link>
            </Button>
          </div>
        </div>
    );
}




