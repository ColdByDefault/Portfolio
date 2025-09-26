"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Rocket,
  Bot,
  Code,
  Server,
  Monitor,
  Database,
  ArrowDown,
  ArrowRight,
  Users,
  Brain,
} from "lucide-react";

const DiagramNode = ({
  children,
  className = "",
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <div
    className={`p-3 rounded-lg border-2 text-center text-sm font-medium ${className}`}
  >
    {Icon && <Icon className="w-4 h-4 mx-auto mb-1" />}
    {children}
  </div>
);

const Arrow = ({ direction = "down" }: { direction?: "down" | "right" }) => (
  <div className="flex justify-center items-center">
    {direction === "down" ? (
      <ArrowDown className="w-5 h-5" />
    ) : (
      <ArrowRight className="w-5 h-5" />
    )}
  </div>
);

const SubgraphContainer = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`border-2 border-dashed rounded-lg p-4 ${className}`}>
    <h3 className="text-lg font-bold text-center mb-4">{title}</h3>
    {children}
  </div>
);

export default function MermaidStyleDiagram() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            THE ALMIGHTY PORTFOLIO SYSTEM v4.11.18
          </h1>
          <p className="text-lg">
            It&apos;s not much, but it&apos;s honest work - Portfolio Edition
          </p>
        </div>

        {/* Client Side Flow */}
        <SubgraphContainer title="CLIENT SIDE - Where Dreams Come True">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <DiagramNode icon={Users}>
              User Arrives
              <br />
              Please don&apos;t be another basic portfolio
            </DiagramNode>
            <Arrow direction="right" />
            <DiagramNode>
              First Time?
              <br />
              Checking cookies
            </DiagramNode>
          </div>

          <Arrow />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiagramNode>
              Language Detective
              <br />
              Accept-Language header snooping
            </DiagramNode>
            <DiagramNode>
              Load Preferences
              <br />
              Welcome back, friend!
            </DiagramNode>
          </div>

          <Arrow />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiagramNode>
              Set Locale Cookie
              <br />
              PORTFOLIOVERSIONLATEST_LOCALE
            </DiagramNode>
            <DiagramNode>
              Middleware Magic
              <br />
              Security headers go brrr
            </DiagramNode>
          </div>

          <Arrow />

          <DiagramNode>
            Layout.tsx Renders
            <br />
            The One Layout to Rule Them All
          </DiagramNode>
        </SubgraphContainer>

        {/* Component Orchestra */}
        <SubgraphContainer title="COMPONENT ORCHESTRA">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <DiagramNode icon={Code}>
              Navbar
              <br />
              Hello there! - General Kenobi
            </DiagramNode>
            <DiagramNode icon={Code}>
              Hero Component
              <br />
              Main character energy
            </DiagramNode>
            <DiagramNode icon={Code}>
              About Section
              <br />
              The autobiography
            </DiagramNode>
            <DiagramNode icon={Code}>
              Projects Gallery
              <br />
              Portfolio flexing zone
            </DiagramNode>
            <DiagramNode icon={Code}>
              Blog Posts
              <br />
              Where thoughts go to live
            </DiagramNode>
            <DiagramNode icon={Bot}>
              Reem Chatbot
              <br />
              AI-powered sass machine
            </DiagramNode>
            <DiagramNode icon={Code}>
              Footer
              <br />
              The credits nobody reads
            </DiagramNode>
            <DiagramNode>
              Page Rendered
              <br />
              Perfectly balanced
            </DiagramNode>
          </div>
        </SubgraphContainer>

        {/* Interaction Engine */}
        <SubgraphContainer title="INTERACTION ENGINE - The Fun Begins">
          <div className="text-center space-y-4">
            <DiagramNode icon={Monitor}>
              User Action?
              <br />
              Click something!
            </DiagramNode>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <DiagramNode>
                Chatbot
                <br />
                Reem Activated
              </DiagramNode>
              <DiagramNode>
                Navigation
                <br />
                Next.js router magic
              </DiagramNode>
              <DiagramNode>
                Theme Toggle
                <br />
                Dark mode engaged
              </DiagramNode>
              <DiagramNode>
                Language Switch
                <br />
                Polyglot mode
              </DiagramNode>
            </div>
          </div>
        </SubgraphContainer>

        {/* AI Overlord */}
        <SubgraphContainer title="AI OVERLORD - Reem's Domain">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <DiagramNode icon={Brain}>
                Input Validation
                <br />
                No soup for XSS!
              </DiagramNode>
              <Arrow direction="right" />
              <DiagramNode>
                Rate Limiting
                <br />
                Not made of money!
              </DiagramNode>
              <Arrow direction="right" />
              <DiagramNode>
                Gemini API Call
                <br />
                Google&apos;s AI magic
              </DiagramNode>
            </div>
            <Arrow />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DiagramNode>
                Response Generated
                <br />
                Wisdom (or sass) returned
              </DiagramNode>
              <DiagramNode>
                JSON Response
                <br />+ sessionId for privacy
              </DiagramNode>
            </div>
          </div>
        </SubgraphContainer>

        {/* Database Kingdom */}
        <SubgraphContainer title="DATABASE KINGDOM - Where Data Lives">
          <div className="text-center space-y-4">
            <h4 className="font-semibold">Prisma Schema Empire</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <DiagramNode icon={Database}>
                BlogPost Model
                <br />
                The meat and potatoes
              </DiagramNode>
              <DiagramNode icon={Database}>
                BlogCategory
                <br />
                Organized chaos
              </DiagramNode>
              <DiagramNode icon={Database}>
                BlogTag
                <br />
                Hashtag culture
              </DiagramNode>
              <DiagramNode icon={Database}>
                Comments
                <br />
                Real discussions
              </DiagramNode>
              <DiagramNode icon={Database}>
                User Model
                <br />
                The chosen ones
              </DiagramNode>
            </div>
          </div>
        </SubgraphContainer>

        {/* API Routes */}
        <SubgraphContainer title="API ROUTES - The Backend Ballet">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <DiagramNode icon={Server}>
              /api/blog
              <br />
              CRUD operations galore
            </DiagramNode>
            <DiagramNode icon={Server}>
              /api/chatbot
              <br />
              Reem&apos;s communication hub
            </DiagramNode>
            <DiagramNode icon={Server}>
              /api/admin
              <br />
              The secret lair
            </DiagramNode>
            <DiagramNode icon={Server}>
              /api/github
              <br />
              Portfolio data pipeline
            </DiagramNode>
            <DiagramNode icon={Server}>
              /api/pagespeed
              <br />
              Performance monitoring
            </DiagramNode>
          </div>
        </SubgraphContainer>

        {/* Security & Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SubgraphContainer title="SECURITY FORTRESS - Fort Knox Mode">
            <div className="space-y-3">
              <DiagramNode icon={Shield}>
                Security Headers
                <br />
                Every header known to mankind
              </DiagramNode>
              <DiagramNode>
                Input Sanitization
                <br />
                Nice try, hacker!
              </DiagramNode>
              <DiagramNode>
                Rate Limiting
                <br />
                Slow down there, speed racer
              </DiagramNode>
              <DiagramNode>
                Secure Cookies
                <br />
                HttpOnly + SameSite protection
              </DiagramNode>
              <DiagramNode>
                HTTPS Enforcement
                <br />
                Encrypt ALL the things
              </DiagramNode>
            </div>
          </SubgraphContainer>

          <SubgraphContainer title="PERFORMANCE THEATER - Need for Speed">
            <div className="space-y-3">
              <DiagramNode icon={Zap}>
                Turbopack
                <br />
                Rust-powered development
              </DiagramNode>
              <DiagramNode>
                Image Optimization
                <br />
                AVIF + WebP formats
              </DiagramNode>
              <DiagramNode>
                Bundle Optimization
                <br />
                Tree shaking like autumn
              </DiagramNode>
              <DiagramNode>
                Caching Strategy
                <br />
                Cache it like you mean it
              </DiagramNode>
              <DiagramNode>
                Analytics + Speed Insights
                <br />
                Big brother watching (good way)
              </DiagramNode>
            </div>
          </SubgraphContainer>
        </div>

        {/* Deployment Pipeline */}
        <SubgraphContainer title="DEPLOYMENT PIPELINE - Deploy and Pray">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <DiagramNode icon={Rocket}>
              npm run almighty
              <br />
              The holy trinity command
            </DiagramNode>
            <Arrow direction="right" />
            <DiagramNode>
              Next.js Build
              <br />
              Make it production ready
            </DiagramNode>
            <Arrow direction="right" />
          </div>
          <Arrow />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiagramNode>
              Prisma Migration
              <br />
              Database first, questions later
            </DiagramNode>
            <DiagramNode>
              Vercel Deploy
              <br />
              Deploy button go brrr
            </DiagramNode>
          </div>
        </SubgraphContainer>

        {/* Footer */}
        <div className="text-center py-8 space-y-2">
          <Badge variant="secondary">
            Interactive Mermaid-Style Architecture Diagram
          </Badge>
          <p>Visual representation of the complete portfolio system flow</p>
        </div>
      </div>
    </div>
  );
}
