/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * A component that visually hides content but keeps it accessible to screen readers
 */
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span className="sr-only">{children}</span>;

interface ImageZoomDialogProps {
  src: string;
  alt: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable component that wraps any content (typically an Image)
 * to make it clickable and show a zoomed version in a dialog
 */
export function ImageZoomDialog({
  src,
  alt,
  title,
  children,
  className,
}: ImageZoomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-zoom-in transition-opacity hover:opacity-80 border-none bg-transparent p-0 m-0",
            className
          )}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-md bg-black/70" />
        <DialogContent
          className="max-w-[98vw] max-h-[98vh] p-4 overflow-hidden bg-black/95 border-none shadow-2xl [&>button]:text-white [&>button]:hover:text-gray-300 [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full [&>button]:p-2"
          showCloseButton={true}
        >
          <VisuallyHidden>
            <DialogTitle>{title || `View ${alt}`}</DialogTitle>
          </VisuallyHidden>
          <div className="relative flex items-center justify-center w-full h-full min-h-[60vh]">
            <Image
              src={src}
              alt={alt}
              width={1400}
              height={1000}
              className="object-contain w-full h-full max-w-full max-h-[90vh] rounded-lg shadow-lg"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 text-center">
                <h3 className="text-xl font-semibold drop-shadow-lg">
                  {title}
                </h3>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
