
/**
 * Generates an array of breadcrumb items based on the provided path.
 *
 * @ param path - The URL path from which to generate breadcrumbs. 
 *               Query parameters will be ignored.
 * 
 * @ returns An array of `BreadcrumbItem` objects, where each object represents
 *          a segment of the path. Each breadcrumb item includes:
 *          - `label`: A formatted string for display (capitalized and with hyphens replaced by spaces).
 *          - `href`: The URL path up to the corresponding segment.
 *          - `isCurrentPage`: A boolean indicating if the segment is the current page.
 *
 * @ example
 * ```typescript
 * const breadcrumbs = generateBreadcrumbs("/home/products/electronics");
 * // Output:
 * // [
 * //   { label: "Home", href: "/home", isCurrentPage: false },
 * //   { label: "Products", href: "/home/products", isCurrentPage: false },
 * //   { label: "Electronics", href: "/home/products/electronics", isCurrentPage: true }
 * // ]
 * ```
 */
import type { BreadcrumbItem } from "@/components/berich/dynamic-breadcrumb"

export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  // Remove any query parameters
  const pathWithoutQuery = path.split("?")[0]

  // Split the path into segments
  const segments = pathWithoutQuery.split("/").filter(Boolean)

  // If there are no segments, return an empty array
  if (segments.length === 0) return []

  // Generate breadcrumb items
  return segments.map((segment, index) => {
    // Create a path up to this segment
    const href = `/${segments.slice(0, index + 1).join("/")}`

    // Format the label (capitalize and replace hyphens with spaces)
    const label = segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

    // The last segment is the current page
    const isCurrentPage = index === segments.length - 1

    return { label, href, isCurrentPage }
  })
}

