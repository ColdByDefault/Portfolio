/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import {
  Code,
  Globe,
  Target,
  Gauge,
  Shield,
  Languages,
  Database,
  Zap,
  Palette,
  Settings,
  GitBranch,
  TestTube,
  Rocket,
  CheckCircle,
} from "lucide-react";
import type {
  TechStackItem,
  ArchitectureNode,
  WorkflowStep,
  CodeExample,
  PerformanceMetric,
} from "@/types/portfolio-section.types";

export const architectureNodes: ArchitectureNode[] = [
  {
    icon: Globe,
    title: "CDN & Edge Network",
    subtitle: "Vercel Edge Network",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Shield,
    title: "Security & Middleware",
    subtitle: "CSP Headers + Rate Limiting + Request Sanitization",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: Code,
    title: "Frontend Application",
    subtitle: "Next.js 15.5.1 + React 19.1.1 + TypeScript",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Languages,
    title: "Internationalization",
    subtitle: "next-intl 4.3.5 (5 Languages)",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: Target,
    title: "Database Layer",
    subtitle: "Neon PostgreSQL + Prisma ORM",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Gauge,
    title: "API Integration",
    subtitle: "GitHub API + PageSpeed Insights",
    color: "bg-orange-500/10 text-orange-600",
  },
];

export const techStacks: TechStackItem[] = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Modern reactive user interfaces with Next.js 15.5.1 and React 19.1.1, featuring server components and edge runtime optimization.",
    technologies: [
      "Next.js 15.5.1",
      "React 19.1.1",
      "TypeScript 5.x",
      "Server Components",
      "Framer Motion 12.x",
      "React Hooks",
    ],
    level: 95,
  },
  {
    icon: Database,
    title: "Backend & Database",
    description:
      "Type-safe backend development with Prisma ORM and serverless PostgreSQL, ensuring data integrity and optimal performance.",
    technologies: [
      "Prisma ORM",
      "Neon PostgreSQL",
      "Zod Validation",
      "Next.js API Routes",
      "Vercel Edge Functions",
      "Database Migrations",
    ],
    level: 90,
  },
  {
    icon: Palette,
    title: "UI/UX & Design",
    description:
      "Accessible, responsive design systems with modern animations and cross-platform compatibility for optimal user experience.",
    technologies: [
      "Tailwind CSS 4.1.12",
      "Radix UI Primitives",
      "shadcn/ui Components",
      "Embla Carousel 8.6.0",
      "Lucide React Icons",
      "Responsive Design",
    ],
    level: 88,
  },
  {
    icon: Zap,
    title: "Performance & SEO",
    description:
      "Lighthouse 100/100 optimization with advanced caching strategies, Core Web Vitals optimization, and comprehensive SEO implementation.",
    technologies: [
      "Core Web Vitals",
      "Image Optimization",
      "Code Splitting",
      "JSON-LD Schema",
      "Open Graph Meta",
      "Vercel Analytics",
    ],
    level: 100,
  },
  {
    icon: Settings,
    title: "Development Tools",
    description:
      "Modern development workflow with strict TypeScript, comprehensive linting, and automated quality assurance for maintainable code.",
    technologies: [
      "ESLint 9.x",
      "TypeScript Strict Mode",
      "Prettier",
      "Git Workflow",
      "Vercel Deployment",
      "TypeDoc",
    ],
    level: 92,
  },
  {
    icon: Languages,
    title: "Internationalization",
    description:
      "Multi-language support with next-intl 4.3.5, covering 5 languages with dynamic locale routing and SEO optimization.",
    technologies: [
      "next-intl 4.3.5",
      "Dynamic Routing",
      "5 Languages (EN/DE/ES/FR/SV)",
      "Locale Detection",
      "SEO Localization",
      "Type-safe Messages",
    ],
    level: 85,
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    icon: Target,
    label: "Planning & Design",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Code,
    label: "TypeScript Development",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: TestTube,
    label: "Quality Assurance",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: GitBranch,
    label: "Version Control",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Rocket,
    label: "Vercel Deployment",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: CheckCircle,
    label: "Performance Validation",
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

export const codeExamples: CodeExample[] = [
  {
    title: "Frontend Component",
    language: "TypeScript",
    code: `// Lorem ipsum component example
export function LoremComponent({ data }: LoremProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const result = await submitLorem(formData)
      toast.success('Lorem submitted successfully')
      return result
    } catch (err) {
      setError(err.message)
      toast.error('Failed to submit lorem')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Card className="lorem-container">
      <CardContent>
        {error && <Alert variant="destructive">{error}</Alert>}
        <LoremForm onSubmit={handleSubmit} loading={loading} />
      </CardContent>
    </Card>
  )
}`,
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Advanced optimization techniques.",
    items: [
      "Code splitting & lazy loading",
      "Image optimization & WebP conversion",
      "Caching strategies (Redis, CDN)",
      "Bundle size optimization",
      "Tree shaking & dead code elimination",
      "Service worker implementation",
    ],
    score: 98,
  },
];
