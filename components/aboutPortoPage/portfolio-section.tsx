"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Layers,
  FileCode,
  Workflow,
  Briefcase,
} from "lucide-react";
import {
  architectureNodes,
  techStacks,
  workflowSteps,
  projects,
  projectCategories,
  codeExamples,
  performanceMetrics,
} from "@/data/portfolio-section.data";

export function ArchitectureDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          System Architecture Overview
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comprehensive
          full-stack architecture design.
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

export function TechStackGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techStacks.map((stack, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stack.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{stack.title}</CardTitle>
                {stack.level && (
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={stack.level} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">
                      {stack.level}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {stack.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              {stack.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function WorkflowDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="w-5 h-5" />
          Development Workflow Process
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comprehensive
          development lifecycle management.
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

export function ProjectShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Featured Projects Portfolio
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comprehensive
          showcase of technical achievements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {projectCategories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {projectCategories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="space-y-6">
                {projects
                  .filter(
                    (project) =>
                      category === "All" || project.category === category
                  )
                  .map((project, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold">
                                {project.title}
                              </h3>
                              <Badge
                                variant={
                                  project.status === "completed"
                                    ? "default"
                                    : project.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {project.description}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground md:text-right md:ml-4">
                            <div className="font-medium text-foreground">
                              {project.metrics}
                            </div>
                            <div className="text-xs mt-1">
                              {project.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

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

export function PerformanceMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {performanceMetrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {metric.score}%
                </div>
                <Progress value={metric.score} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {metric.description}
            </CardDescription>
            <ul className="text-sm space-y-2">
              {metric.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
