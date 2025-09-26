import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, Layers } from "lucide-react";
import { architectureNodes } from "@/data/portfolio-section.data";

export function ArchitectureDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          System Architecture Overview
        </CardTitle>
        <CardDescription>
          Modern edge-first architecture with Next.js 15.5.1, React 19.1.1, and
          Vercel&apos;s global CDN for optimal performance and scalability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {architectureNodes.map((node, index) => (
            <div key={index}>
              <div
                className={`flex items-center gap-4 ${node.color} rounded-lg p-4 w-full max-w-md border`}
              >
                <node.icon className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">{node.title}</h3>
                  <p className="text-sm opacity-80">{node.subtitle}</p>
                </div>
              </div>
              {index < architectureNodes.length - 1 && (
                <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto my-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
