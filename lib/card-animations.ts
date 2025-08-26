/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

// Shared card hover styles
export const cardHoverStyles = {
  base: "border-gray-500/50 bg-white shadow-2xl",
  themed:
    "dark:bg-black dark:shadow-yellow-500/20 dark:border-yellow-500/50 bg-white shadow-blue-200/20",
};

// Gradient overlay configurations
export const gradientOverlays = {
  light: {
    backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%),
                     linear-gradient(-45deg, transparent 30%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)`,
  },
  dark: {
    backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(218, 165, 32, 0.09) 50%, transparent 70%),
                     linear-gradient(-45deg, transparent 30%, rgba(255, 215, 0, 0.09) 50%, transparent 70%)`,
  },
};

// Animation configuration
export const cardAnimation = {
  backgroundSize: "200% 200%",
  animation: "gradient-shift 3s ease infinite",
};

// Helper function to get card class names
export const getCardHoverClasses = (isHovered: boolean) => {
  return `
    relative overflow-hidden transition-all duration-500 ease-out group
    ${isHovered ? cardHoverStyles.base : ""}
    ${isHovered ? cardHoverStyles.themed : ""}
  `;
};

// Helper function to get overlay styles
export const getOverlayStyles = (isHovered: boolean, isDark = false) => {
  if (!isHovered) return { backgroundImage: "none" };

  const gradient = isDark ? gradientOverlays.dark : gradientOverlays.light;
  return {
    ...gradient,
    ...cardAnimation,
  };
};

// CSS for gradient animation keyframes
export const gradientShiftCSS = `
  @keyframes gradient-shift {
    0%, 100% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
  }
`;
