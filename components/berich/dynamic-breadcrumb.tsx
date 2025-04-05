import React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem as UIBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItem[]
  showHomeIcon?: boolean
  separator?: React.ReactNode
}

export function DynamicBreadcrumb({
  items,
  showHomeIcon = true,
  separator = <ChevronRight className="h-4 w-4" />,
}: DynamicBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showHomeIcon && (
          <>
            <UIBreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/berich">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </BreadcrumbLink>
            </UIBreadcrumbItem>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          </>
        )}

        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <UIBreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href || "#"}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </UIBreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

