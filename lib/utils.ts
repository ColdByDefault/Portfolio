
/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * to ensure no conflicting styles are applied.
 *
 * This utility function leverages `clsx` to conditionally join class names and
 * `tailwind-merge` to intelligently merge Tailwind CSS class names.
 *
 * @ param inputs - A list of class values that can be strings, arrays, or objects
 *                 where keys are class names and values are booleans indicating
 *                 whether the class should be included.
 * @ returns A single string of merged and resolved class names.
 *
 * @ example
 * ```typescript
 * const className = cn("bg-red-500", "text-white", { "p-4": true, "m-2": false });
 * // Result: "bg-red-500 text-white p-4"
 * ```
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
