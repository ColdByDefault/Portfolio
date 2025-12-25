/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;

    // Check if user has already made a choice about cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Explicitly return undefined when no cleanup is needed
    return undefined;
  }, [mounted]);

  const handleAccept = () => {
    if (mounted) {
      localStorage.setItem("cookie-consent", "accepted");
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    if (mounted) {
      localStorage.setItem("cookie-consent", "declined");
    }
    setIsVisible(false);
  };

  const handleClose = () => {
    // If user closes without choosing, we'll ask again next time
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-10",
        "animate-in slide-in-from-bottom-5 duration-500",
        "max-w-md md:max-w-lg lg:max-w-xl ml-auto"
      )}
    >
      <Card className="border-2 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-11 w-11"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">close</span>
        </Button>

        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="shrink-0">
              <Cookie className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white">
                  We value your privacy
                </CardTitle>
                <CardDescription className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  I bake my own cookies! Theme preferences are stored locally in
                  your browser. I use Vercel Analytics and Speed Insights to
                  monitor performance, which are privacy-friendly and do not
                  track personal data.{" "}
                  <a
                    href="/privacy"
                    className="text-primary hover:underline"
                    onClick={handleClose}
                    aria-label="Learn more about privacy policy and cookie usage"
                  >
                    Learn more about privacy policy
                  </a>
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    Accept All Cookies
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    Essential Only
                  </Button>
                </div>
                <Button
                  onClick={handleDecline}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Decline Analytics
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
