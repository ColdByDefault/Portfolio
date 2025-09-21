/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import {
  Code2,
  Database,
  Gauge,
  Globe,
  Settings,
  Palette,
  FolderTree,
  Bot,
} from "lucide-react";
import type {
  DeviceType,
  PortoCardFeature,
  ResponsiveConfig,
} from "@/types/aboutPorto";

/**
 * Debounce utility function to improve performance
 */
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: NodeJS.Timeout;

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T & { cancel: () => void };

  debounced.cancel = () => clearTimeout(timeoutId);

  return debounced;
}

/**
 * Determines the device type and responsive configuration
 */
export function useResponsiveConfig(): ResponsiveConfig {
  const [deviceType, setDeviceType] = React.useState<DeviceType>("desktop");

  React.useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Debounce resize handler to improve performance
    const debouncedHandler = debounce(checkDeviceType, 150);

    // Set initial device type
    checkDeviceType();

    window.addEventListener("resize", debouncedHandler);
    return () => {
      window.removeEventListener("resize", debouncedHandler);
      // Clear any pending debounced calls
      debouncedHandler.cancel?.();
    };
  }, []);

  // Memoize computed values to prevent unnecessary recalculations
  const containerClasses = React.useMemo(
    () => getContainerClasses(deviceType),
    [deviceType]
  );
  const cardClasses = React.useMemo(
    () => getCardClasses(deviceType),
    [deviceType]
  );
  const featuresConfig = React.useMemo(
    () => getFeaturesConfig(deviceType),
    [deviceType]
  );

  return React.useMemo(
    () => ({
      deviceType,
      containerClasses,
      cardClasses,
      featuresConfig,
    }),
    [deviceType, containerClasses, cardClasses, featuresConfig]
  );
}

/**
 * Gets container CSS classes based on device type
 */
function getContainerClasses(deviceType: DeviceType): string {
  switch (deviceType) {
    case "mobile":
      return "container mx-auto px-4 py-6";
    case "tablet":
      return "container mx-auto px-6 py-8";
    case "desktop":
      return "container mx-auto px-4 py-8";
    default:
      return "container mx-auto px-4 py-8";
  }
}

/**
 * Gets card CSS classes based on device type
 */
function getCardClasses(deviceType: DeviceType): string {
  switch (deviceType) {
    case "mobile":
      return "w-full mx-auto";
    case "tablet":
      return "w-full max-w-5xl mx-auto";
    case "desktop":
      return "w-full max-w-6xl mx-auto";
    default:
      return "w-full max-w-6xl mx-auto";
  }
}

/**
 * Gets features configuration based on device type
 */
function getFeaturesConfig(deviceType: DeviceType): {
  features: PortoCardFeature[];
  showAll: boolean;
} {
  const allFeatures: PortoCardFeature[] = [
    {
      key: "techStack",
      icon: React.createElement(Code2, { className: "h-4 w-4" }),
      badges: ["Next.js 15.5.1", "React 19", "TypeScript", "App Router"],
      priority: 1,
    },
    {
      key: "performance",
      icon: React.createElement(Gauge, { className: "h-4 w-4" }),
      badges: ["95+ Lighthouse", "SEO 100/100", "A11y Optimized"],
      priority: 1,
    },
    {
      key: "cleanArchitecture",
      icon: React.createElement(FolderTree, { className: "h-4 w-4" }),
      badges: ["/lib", "/data", "/hooks", "/types"],
      priority: 2,
    },
    {
      key: "database",
      icon: React.createElement(Database, { className: "h-4 w-4" }),
      badges: ["PostgreSQL", "Prisma ORM", "Neon DB"],
      priority: 2,
    },
    {
      key: "aiChatbot",
      icon: React.createElement(Bot, { className: "h-4 w-4" }),
      badges: ["AI Assistant", "Portfolio Guide", "Interactive Help"],
      priority: 1,
    },
    {
      key: "mainFeatures",
      icon: React.createElement(Globe, { className: "h-4 w-4" }),
      badges: ["Blog System", "Media Gallery", "Content Library"],
      priority: 3,
    },
    {
      key: "techFeatures",
      icon: React.createElement(Settings, { className: "h-4 w-4" }),
      badges: ["MCP GitHub", "Live PageSpeed", "CI/CD Automation"],
      priority: 3,
    },
    {
      key: "localization",
      icon: React.createElement(Palette, { className: "h-4 w-4" }),
      badges: ["5 Languages", "Light/Dark Themes", "Auto-detection"],
      priority: 3,
    },
  ];

  switch (deviceType) {
    case "mobile":
      // Show only top priority features on mobile
      return {
        features: allFeatures.filter((f) => f.priority === 1),
        showAll: false,
      };
    case "tablet":
      // Show top 2 priority levels on tablet
      return {
        features: allFeatures.filter((f) => f.priority <= 2),
        showAll: false,
      };
    case "desktop":
      // Show all features on desktop
      return {
        features: allFeatures,
        showAll: true,
      };
    default:
      return {
        features: allFeatures,
        showAll: true,
      };
  }
}

/**
 * Gets grid configuration for features display
 */
export function getFeatureGridClasses(deviceType: DeviceType): string {
  switch (deviceType) {
    case "mobile":
      return "grid grid-cols-1 gap-3";
    case "tablet":
      return "grid grid-cols-2 gap-4";
    case "desktop":
      return "grid grid-cols-3 gap-4";
    default:
      return "grid grid-cols-3 gap-4";
  }
}

/**
 * Gets the tech stack highlights for display
 */
export function getTechStackHighlights(deviceType: DeviceType): string[] {
  const allTechs = [
    "Tailwind CSS",
    "shadcnUI",
    "Framer Motion",
    "Embla Carousel",
    "next-intl",
    "Vercel Edge",
    "Zod Validation",
    "ESLint 9.x",
  ];

  switch (deviceType) {
    case "mobile":
      return allTechs.slice(0, 4); // Show only 4 on mobile
    case "tablet":
      return allTechs.slice(0, 6); // Show 6 on tablet
    case "desktop":
      return allTechs; // Show all on desktop
    default:
      return allTechs;
  }
}

/**
 * Component-specific utilities
 */
export const PortoCardUtils = {
  getHeaderLayout(deviceType: DeviceType): "vertical" | "horizontal" {
    return deviceType === "mobile" ? "vertical" : "horizontal";
  },

  shouldShowSection(
    section: "techHighlights" | "readMore",
    deviceType: DeviceType
  ): boolean {
    if (section === "techHighlights") {
      return deviceType !== "mobile"; // Hide tech highlights on mobile to reduce height
    }
    return true;
  },

  getDescriptionLength(deviceType: DeviceType): "short" | "full" {
    return deviceType === "mobile" ? "short" : "full";
  },
};
