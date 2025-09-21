/**
 * About Portfolio Page Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface PortfolioOverview {
  readonly version: string;
  readonly name: string;
  readonly description: string;
  readonly author: string;
  readonly liveUrl: string;
  readonly githubUrl?: string;
  readonly developmentTime: string;
  readonly lastUpdated: string;
  readonly status: "active" | "maintenance" | "archived";
}

export interface TechnicalStack {
  readonly category:
    | "core"
    | "development"
    | "database"
    | "deployment"
    | "ai"
    | "security";
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly purpose: string;
  readonly icon?: string;
}

export interface ProjectFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category:
    | "ui-ux"
    | "performance"
    | "security"
    | "ai"
    | "content"
    | "integration";
  readonly technicalDetails: string[];
  readonly benefits: string[];
  readonly implementation: string;
  readonly priority: 1 | 2 | 3;
  readonly completed: boolean;
}

export interface PerformanceMetrics {
  readonly lighthouse: {
    readonly performance: number;
    readonly accessibility: number;
    readonly bestPractices: number;
    readonly seo: number;
    readonly lastChecked: string;
  };
  readonly coreWebVitals: {
    readonly lcp: string; // Largest Contentful Paint
    readonly fid: string; // First Input Delay
    readonly cls: string; // Cumulative Layout Shift
  };
  readonly bundleSize: {
    readonly total: string;
    readonly gzipped: string;
    readonly chunks: string;
  };
}

export interface SecurityFeature {
  readonly type:
    | "headers"
    | "validation"
    | "authentication"
    | "rateLimit"
    | "csp"
    | "sanitization";
  readonly name: string;
  readonly description: string;
  readonly implementation: string;
  readonly severity: "critical" | "high" | "medium" | "low";
  readonly status: "implemented" | "planned" | "testing";
}

export interface ArchitecturePattern {
  readonly pattern: string;
  readonly description: string;
  readonly benefits: string[];
  readonly implementation: string;
  readonly files: string[];
  readonly examples?: string[];
}

export interface InternationalizationConfig {
  readonly supportedLocales: readonly string[];
  readonly defaultLocale: string;
  readonly detectionStrategy: string[];
  readonly fallbackStrategy: string;
  readonly messageFiles: readonly string[];
  readonly features: readonly string[];
}

export interface DatabaseSchema {
  readonly provider: string;
  readonly orm: string;
  readonly tables: readonly DatabaseTable[];
  readonly relationships: readonly DatabaseRelation[];
  readonly features: readonly string[];
}

export interface DatabaseTable {
  readonly name: string;
  readonly purpose: string;
  readonly fields: readonly DatabaseField[];
  readonly indexes: readonly string[];
}

export interface DatabaseField {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly unique?: boolean;
  readonly description: string;
}

export interface DatabaseRelation {
  readonly from: string;
  readonly to: string;
  readonly type: "one-to-one" | "one-to-many" | "many-to-many";
  readonly description: string;
}

export interface AIIntegration {
  readonly name: string;
  readonly provider: string;
  readonly model: string;
  readonly purpose: string;
  readonly features: readonly string[];
  readonly implementation: string;
  readonly rateLimits: {
    readonly perMinute: number;
    readonly perHour: number;
    readonly perDay?: number;
  };
  readonly securityMeasures: readonly string[];
}

export interface QualityMetrics {
  readonly codeQuality: {
    readonly eslintRules: number;
    readonly typeScriptStrict: boolean;
    readonly testCoverage?: number;
    readonly codeSmells: number;
    readonly duplications: number;
  };
  readonly performance: PerformanceMetrics;
  readonly security: {
    readonly vulnerabilities: number;
    readonly securityScore: number;
    readonly lastAudit: string;
  };
  readonly accessibility: {
    readonly wcagCompliance: "A" | "AA" | "AAA";
    readonly ariaImplementation: boolean;
    readonly keyboardNavigation: boolean;
    readonly screenReaderSupport: boolean;
  };
}

export interface DevelopmentWorkflow {
  readonly gitWorkflow: string;
  readonly branchingStrategy: string;
  readonly cicdPipeline: readonly string[];
  readonly qualityGates: readonly string[];
  readonly deploymentStrategy: string;
  readonly monitoringTools: readonly string[];
}

export interface AboutPortfolioData {
  readonly overview: PortfolioOverview;
  readonly technicalStack: readonly TechnicalStack[];
  readonly features: readonly ProjectFeature[];
  readonly performance: PerformanceMetrics;
  readonly security: readonly SecurityFeature[];
  readonly architecture: readonly ArchitecturePattern[];
  readonly internationalization: InternationalizationConfig;
  readonly database: DatabaseSchema;
  readonly aiIntegrations: readonly AIIntegration[];
  readonly qualityMetrics: QualityMetrics;
  readonly developmentWorkflow: DevelopmentWorkflow;
  readonly roadmap: readonly RoadmapItem[];
  readonly achievements: readonly Achievement[];
}

export interface RoadmapItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly priority: "high" | "medium" | "low";
  readonly status: "planned" | "in-progress" | "completed" | "on-hold";
  readonly estimatedCompletion?: string;
  readonly dependencies?: readonly string[];
  readonly category: "feature" | "performance" | "security" | "maintenance";
}

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly metric?: string;
  readonly date: string;
  readonly category:
    | "performance"
    | "security"
    | "quality"
    | "feature"
    | "milestone";
  readonly impact: "high" | "medium" | "low";
}

// Component Props Types
export interface AboutPortfolioPageProps {
  readonly className?: string;
}

export interface PortfolioSectionProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export interface TechStackGridProps {
  readonly technologies: readonly TechnicalStack[];
  readonly className?: string;
}

export interface FeatureCardProps {
  readonly feature: ProjectFeature;
  readonly className?: string;
}

export interface MetricsDisplayProps {
  readonly metrics: PerformanceMetrics;
  readonly className?: string;
}

export interface SecurityBadgeProps {
  readonly security: SecurityFeature;
  readonly className?: string;
}

export interface ArchitectureVisualizationProps {
  readonly patterns: readonly ArchitecturePattern[];
  readonly className?: string;
}

export interface AIFeatureShowcaseProps {
  readonly integrations: readonly AIIntegration[];
  readonly className?: string;
}

// Utility Types
export type PortfolioSection =
  | "overview"
  | "stack"
  | "features"
  | "performance"
  | "security"
  | "architecture"
  | "ai"
  | "roadmap";

export interface PortfolioNavigationItem {
  readonly section: PortfolioSection;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

// Filter and Display Types
export interface StackFilter {
  readonly category: TechnicalStack["category"] | "all";
  readonly label: string;
}

export interface FeatureFilter {
  readonly category: ProjectFeature["category"] | "all";
  readonly label: string;
}

export type PortfolioViewMode = "overview" | "technical" | "detailed";

export interface PortfolioDisplayConfig {
  readonly viewMode: PortfolioViewMode;
  readonly showMetrics: boolean;
  readonly showRoadmap: boolean;
  readonly expandedSections: readonly PortfolioSection[];
}
