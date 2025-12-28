/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowRight, Workflow } from "lucide-react";
import { workflowSteps } from "@/data/portfolio-section.data";

export function WorkflowDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="w-5 h-5" />
          Development Workflow Process
        </CardTitle>
        <CardDescription>
          Modern development lifecycle with TypeScript-first approach, automated
          quality assurance, and continuous deployment to Vercel edge network.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {workflowSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${step.color} rounded-lg p-3 border`}
              >
                <step.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{step.label}</span>
              </div>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
