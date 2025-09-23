/**
 * Shared Components for About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SectionCardProps {
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function SectionCard({
  title,
  description,
  children,
  className,
}: SectionCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface FeatureListProps {
  readonly items: readonly string[];
  readonly className?: string;
}

export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={`space-y-2 ${className || ""}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface TechBadgeListProps {
  readonly technologies: readonly string[];
  readonly className?: string;
}

export function TechBadgeList({ technologies, className }: TechBadgeListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {technologies.map((tech, index) => (
        <Badge key={index} variant="secondary">
          {tech}
        </Badge>
      ))}
    </div>
  );
}
