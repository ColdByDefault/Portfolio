/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-purple-600 to-purple-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Access Blocked
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-700">
            Too many failed authentication attempts detected.
          </p>
          <p className="text-sm text-gray-600">
            Your IP has been temporarily blocked for security reasons.
            <br />
            <strong>Please try again after 15 minutes.</strong>
          </p>
          <div className="mt-6 pt-4 border-t text-xs text-gray-500">
            If you believe this is an error, please contact the administrator.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
