/**
 * Reusable CTA Button Component
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { servicesPageData } from "@/data/hubs/servicesData";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface CTAButtonProps {
  /** Button text label */
  readonly label: string;
  /** Optional variant for the button */
  readonly variant?: ButtonVariants["variant"];
  /** Optional size for the button */
  readonly size?: ButtonVariants["size"];
  /** Optional custom className */
  readonly className?: string;
  /** Whether to show the Calendar icon */
  readonly showIcon?: boolean;
  /** Optional onClick handler for when the link is clicked */
  readonly onClick?: () => void;
  /** Optional custom booking link (defaults to servicesPageData.bookingLink) */
  readonly href?: string;
}

/**
 * Dynamic CTA button component for booking calls
 * Uses the booking link from servicesData by default
 */
export function CTAButton({
  label,
  variant = "default",
  size,
  className = "",
  showIcon = true,
  onClick,
  href = servicesPageData.bookingLink,
}: CTAButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...(onClick && { onClick })}
        aria-label="Book a free consultation call"
      >
        {showIcon && <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />}
        {label}
      </Link>
    </Button>
  );
}
