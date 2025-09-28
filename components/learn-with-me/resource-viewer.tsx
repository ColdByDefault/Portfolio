/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Share2,
  Star,
  Clock,
  User,
  Eye,
  MoreVertical,
} from "lucide-react";

interface ResourceViewerProps {
  className?: string;
}

export function ResourceViewer({ className }: ResourceViewerProps) {


  return (
    <div className={`flex-1 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <FileText className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-balance">
              1
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                1
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                1
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                1 views
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">1</Badge>
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Favorite
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="p-2 bg-transparent">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <Card className="flex-1 p-8">
        <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
          <div className="text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">PDF Preview</h3>
            <p className="text-muted-foreground mb-4">
              Click to view the full document or download to access offline
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download (1.2 MB)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="mt-6 p-4">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-muted-foreground">
              Downloaded by John Doe
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">5 minutes ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-muted-foreground">
              Viewed by Maria Garcia
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">1 hour ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-muted-foreground">Updated by Sarah Chen</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">2 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
