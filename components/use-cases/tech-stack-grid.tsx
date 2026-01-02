import type { TechStack } from "@/types/use-cases";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Code2,
  Sparkles,
  Package,
  Zap,
  Cloud,
  Server,
  Layout,
  Blocks,
  FileCode,
  type LucideIcon,
} from "lucide-react";

interface TechStackGridProps {
  techStack: TechStack[];
}

function getTechIcon(name: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    // Databases
    Supabase: Database,
    PostgreSQL: Database,
    Neon: Database,
    MySQL: Database,
    MongoDB: Database,

    // Frameworks
    "Next.js": Code2,
    React: Code2,
    Vue: Code2,
    Nuxt: Code2,

    // AI/ML
    OpenAI: Sparkles,
    Anthropic: Sparkles,
    "Vercel AI SDK": Sparkles,
    "AI SDK": Sparkles,

    // Tools
    TypeScript: FileCode,
    JavaScript: FileCode,
    "Tailwind CSS": Layout,
    "shadcn/ui": Blocks,

    // Backend/Services
    "Node.js": Server,
    Vercel: Cloud,
    Stripe: Zap,
    tRPC: Server,
    Prisma: Package,
    Drizzle: Package,
  };

  return iconMap[name] || Package;
}

export function TechStackGrid({ techStack }: TechStackGridProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Tech Stack</h4>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const Icon = getTechIcon(tech.name);

          return (
            <Badge
              key={tech.name}
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1.5"
            >
              <Icon className="h-4 w-4" />
              <span>{tech.name}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
