/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ScreenshotGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export function ScreenshotGallery({
  screenshots,
  projectTitle,
}: ScreenshotGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main screenshot */}
      <Dialog>
        <DialogTitle className="sr-only">{projectTitle} Screenshot</DialogTitle>
        <DialogTrigger asChild>
          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted cursor-pointer group">
            <Image
              src={screenshots[currentIndex] || "/placeholder.svg"}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl p-0">
          <div className="relative aspect-video">
            <Image
              src={screenshots[currentIndex] || "/placeholder.svg"}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
            {screenshots.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnail navigation - only show if multiple screenshots */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative shrink-0 h-16 w-24 overflow-hidden rounded border-2 transition-all",
                currentIndex === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Image
                src={screenshot || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
