/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoomIn, ZoomOut } from "lucide-react";

interface TextViewerProps {
  className?: string;
}

const sampleContent = `# Project Guidelines

## Overview
This document outlines the comprehensive guidelines for our project development process. These guidelines ensure consistency, quality, and efficiency across all team members and project phases.

## Development Standards

### Code Quality
- All code must follow our established coding standards
- Comprehensive testing is required for all features
- Code reviews are mandatory before merging
- Documentation must be updated with any changes

### Project Structure
Our project follows a modular architecture that promotes:
- **Scalability**: Easy to extend and modify
- **Maintainability**: Clear separation of concerns
- **Reusability**: Components can be shared across projects
- **Testability**: Each module can be tested independently

### Best Practices
1. **Version Control**: Use meaningful commit messages
2. **Documentation**: Keep README files up to date
3. **Testing**: Write tests before implementing features
4. **Security**: Follow security best practices
5. **Performance**: Optimize for speed and efficiency

## Team Collaboration

### Communication
- Daily standups at 9:00 AM
- Weekly retrospectives on Fridays
- Use Slack for quick questions
- Email for formal communications

### Code Reviews
All pull requests must be reviewed by at least two team members before merging. Focus areas include:
- Code quality and standards compliance
- Security considerations
- Performance implications
- Documentation completeness

## Conclusion
Following these guidelines will help us maintain high standards and deliver exceptional results. Regular updates to this document ensure we stay current with best practices and team needs.`;

export function TextViewer({ className }: TextViewerProps) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className={`flex-1 flex flex-col ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Project Guidelines.pdf</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {fontSize}px
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-8">
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
          >
            <div className="whitespace-pre-wrap">{sampleContent}</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
