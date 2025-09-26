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
  Search,
  Smartphone,
  Monitor,
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
    title: "Custom Hook",
    language: "TypeScript",
    code: `// Custom hook for responsive behavior
export function useResponsiveCarousel(): ResponsiveCarouselConfig {
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(3);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = (): void => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerSlide(1);
        setIsMobile(true);
      } else if (width < 1024) {
        setCardsPerSlide(2);
        setIsMobile(false);
      } else {
        setCardsPerSlide(3);
        setIsMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { cardsPerSlide, isMobile };
}`,
  },
  {
    title: "Logic Hook",
    language: "TypeScript",
    code: `// Business logic separation in custom hook
export function useCertificationShowcaseLogic(): CertificationShowcaseLogic {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkIsTablet();
    window.addEventListener("resize", checkIsTablet);
    return () => window.removeEventListener("resize", checkIsTablet);
  }, []);

  const toggleCard = (id: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return { isMobile, isTablet, expandedCards, hoveredCard, toggleCard, setHoveredCard };
}`,
  },
  {
    title: "Component Structure",
    language: "TypeScript",
    code: `// Clean component with separated concerns
export function CertificationShowcaseMobile({
  certifications,
  logic,
  className,
}: CertificationShowcaseMobileProps) {
  
  const getContainerClasses = () => {
    if (logic.isMobile) {
      return "flex flex-col gap-4 px-2 sm:px-4";
    } else if (logic.isTablet) {
      return "flex flex-col gap-4 px-4";
    }
    return "flex flex-col gap-4 px-4"; // fallback
  };

  const renderCard = (cert: Certification) => {
    if (logic.isMobile) {
      return renderMobileCard(cert);
    } else if (logic.isTablet) {
      return renderTabletCard(cert);
    }
    return renderMobileCard(cert);
  };

  return (
    <section className={className} id="cert">
      <Card className="max-w-7xl mx-auto">
        {certifications.map((cert) => renderCard(cert))}
      </Card>
    </section>
  );
}`,
  },
  {
    title: "API Data Hook",
    language: "TypeScript",
    code: `// Data fetching with caching and error handling
export function usePageSpeedData({
  url,
  showBothStrategies = true,
}: UsePageSpeedDataProps): UsePageSpeedDataReturn {
  const [mobileData, setMobileData] = useState<PageSpeedResult | null>(null);
  const [desktopData, setDesktopData] = useState<PageSpeedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheStatus, setCacheStatus] = useState<
    "fresh" | "updating" | "updated" | null
  >(null);

  const fetchStrategy = useCallback(async (
    strategy: "mobile" | "desktop",
    forceRefresh = false
  ): Promise<void> => {
    try {
      const queryParams = new URLSearchParams({ url, strategy });
      if (forceRefresh) queryParams.append("refresh", "true");
      
      const response = await fetch(\`/api/pagespeed?\${queryParams}\`);
      const result = await response.json();
      
      if (strategy === "mobile") {
        setMobileData(result);
      } else {
        setDesktopData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [url]);

  return { mobileData, desktopData, loading, error, cacheStatus, refresh };
}`,
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    icon: Gauge,
    title: "Core Web Vitals",
    description:
      "Lighthouse 100/100 performance scores with optimized Core Web Vitals metrics for exceptional user experience.",
    items: [
      "Largest Contentful Paint (LCP) < 2.5s",
      "First Input Delay (FID) < 100ms",
      "Cumulative Layout Shift (CLS) < 0.1",
      "Time to Interactive (TTI) optimization",
      "Speed Index optimization",
      "First Contentful Paint (FCP) < 1.8s",
    ],
    score: 95,
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Comprehensive SEO implementation achieving 100/100 Lighthouse SEO score with structured data and meta optimization.",
    items: [
      "JSON-LD structured data schema",
      "Open Graph & Twitter Cards meta",
      "Semantic HTML5 markup",
      "Multi-language SEO optimization",
      "Dynamic sitemap generation",
      "Canonical URLs & robots.txt",
    ],
    score: 100,
  },
  {
    icon: Zap,
    title: "Build Optimization",
    description:
      "Advanced build optimization with Next.js 15.5.1 features, edge runtime, and intelligent code splitting strategies.",
    items: [
      "Server Components optimization",
      "Dynamic imports & lazy loading",
      "Tree shaking & dead code elimination",
      "Bundle size optimization",
      "Image optimization with Next.js Image",
      "Turbopack for faster builds",
    ],
    score: 91,
  },
  {
    icon: Monitor,
    title: "Accessibility",
    description:
      "WCAG 2.1 AA compliance with comprehensive accessibility features ensuring inclusive user experience.",
    items: [
      "Keyboard navigation support",
      "Screen reader compatibility",
      "Color contrast ≥ 4.5:1 ratio",
      "ARIA labels and roles",
      "Skip links implementation",
      "Focus management",
    ],
    score: 92,
  },
  {
    icon: Smartphone,
    title: "Mobile Performance",
    description:
      "Mobile-first responsive design with optimized performance for all device types and screen sizes.",
    items: [
      "Responsive breakpoint optimization",
      "Touch-friendly interface design",
      "Mobile Core Web Vitals < targets",
      "Progressive enhancement",
      "Adaptive loading strategies",
      "Cross-device compatibility",
    ],
    score: 60,
  },
  {
    icon: Shield,
    title: "Security & Headers",
    description:
      "Production-grade security implementation with CSP headers, rate limiting, and comprehensive security measures.",
    items: [
      "Content Security Policy (CSP) headers",
      "Rate limiting implementation",
      "Request sanitization",
      "HTTPS enforcement",
      "Security headers (HSTS, X-Frame-Options)",
      "Input validation & Zod schemas",
    ],
    score: 97,
  },
];
