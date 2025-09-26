import { Code, Globe, Target, Gauge } from "lucide-react";
import type {
  TechStackItem,
  ProjectItem,
  ArchitectureNode,
  WorkflowStep,
  CodeExample,
  PerformanceMetric,
} from "../types/portfolio-section.types";

export const architectureNodes: ArchitectureNode[] = [
  {
    icon: Globe,
    title: "CDN Layer",
    subtitle: "CloudFlare, AWS CloudFront",
    color: "bg-blue-500/10 text-blue-600",
  },
];

export const techStacks: TechStackItem[] = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Modern reactive user interfaces.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
    level: 95,
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    icon: Target,
    label: "Requirements Analysis",
    color: "bg-red-500/10 text-red-600",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Lorem E-commerce Platform",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim. Full-featured online marketplace with advanced analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    metrics: "50k+ users, 99.9% uptime, $2M+ processed",
    category: "E-commerce",
    status: "completed",
  },
];

export const projectCategories = ["All", "Analytics", "Mobile", "AI/ML"];

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
