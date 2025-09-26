/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { Separator } from "@/components/ui/separator";
import {
  ArchitectureDiagram,
  TechStackGrid,
  WorkflowDiagram,
  CodeExamples,
  PerformanceMetrics,
} from "@/components/aboutPortoPage";
import Link from "next/link";

export default function PortfolioDocumentation() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-balance">
            Full-Stack Portfolio
            <span className="block text-primary">Technical Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Comprehensive technical documentation showcasing full-stack
            development expertise, architectural decisions, and implementation
            strategies across modern web technologies including Next.js,
            TypeScript, and cloud infrastructure.
          </p>
        </div>

        {/* System Architecture */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              System Architecture & Design
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the comprehensive system design and architectural patterns
              that power this portfolio, including microservices, API design,
              and scalable infrastructure.
            </p>
          </div>
          <ArchitectureDiagram />
        </section>

        <Separator className="my-20" />

        {/* Technical Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Technical Stack & Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology proficiency across the full development
              stack, from frontend frameworks to backend services and database
              management.
            </p>
          </div>
          <TechStackGrid />
        </section>

        <Separator className="my-20" />

        {/* Development Workflow */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Development Workflow & Methodology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured development processes and agile methodologies including
              CI/CD pipelines, testing strategies, and collaborative workflows.
            </p>
          </div>
          <WorkflowDiagram />
        </section>

        <Separator className="my-20" />

        {/* Code Examples */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Code Examples & Implementation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world code samples and best practices implementation
              showcasing clean code principles and modern development patterns.
            </p>
          </div>
          <CodeExamples />
        </section>

        <Separator className="my-20" />

        {/* Performance & Quality */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Performance & Quality Assurance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive quality metrics and performance optimization
              strategies ensuring excellent user experience and maintainable
              code quality.
            </p>
          </div>
          <PerformanceMetrics />
        </section>
        <section>
          <Link className="mx-auto flex items-center justify-center gap-2 text-sm text-primary hover:underline" href="https://docs.coldbydefault.com"></Link>
        </section>
      </main>
    </div>
  );
}
