/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Books I&apos;ve read, am reading, and recommend for developers and
          tech enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardHeader className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground/75">
                Book recommendations and reviews will be available here soon.
              </p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
