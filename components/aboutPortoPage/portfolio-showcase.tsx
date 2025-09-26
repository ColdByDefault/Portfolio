/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode } from "lucide-react";
import {
  codeExamples,
} from "@/data/portfolio-section.data";


export function CodeExamples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="w-5 h-5" />
          Code Examples & Implementation
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Real-world
          code samples and best practices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {codeExamples.map((example, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="text-xs"
              >
                {example.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {codeExamples.map((example, index) => (
            <TabsContent key={index} value={index.toString()} className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <Badge variant="outline">{example.language}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                      <span className="text-sm font-medium">
                        {example.title}
                      </span>
                    </div>
                    <div className="p-4 font-mono text-sm overflow-x-auto">
                      <pre className="text-foreground whitespace-pre-wrap">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
