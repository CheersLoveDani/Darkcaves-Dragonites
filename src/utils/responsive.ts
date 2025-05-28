// Responsive and Accessibility Utility Functions
import { useEffect, useState } from "react";

// Breakpoint constants matching Tailwind
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Hook for responsive design
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints>("sm");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= breakpoints["2xl"]) {
        setBreakpoint("2xl");
      } else if (width >= breakpoints.xl) {
        setBreakpoint("xl");
      } else if (width >= breakpoints.lg) {
        setBreakpoint("lg");
      } else if (width >= breakpoints.md) {
        setBreakpoint("md");
      } else {
        setBreakpoint("sm");
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Responsive grid classes
export const responsiveGrid = {
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  grid: {
    one: "grid grid-cols-1",
    two: "grid grid-cols-1 sm:grid-cols-2",
    three: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    four: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    five: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    six: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  },
  gaps: {
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 lg:gap-6",
    lg: "gap-4 sm:gap-6 lg:gap-8",
    xl: "gap-6 sm:gap-8 lg:gap-10",
  },
} as const;

// Accessibility helpers
export const focusClasses = {
  default:
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
  destructive:
    "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
  subtle:
    "focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800",
} as const;

export const screenReaderOnly = "sr-only";

// Color contrast utilities for accessibility
export const getContrastRatio = (color1: string, color2: string): number => {
  const getRGB = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b };
  };

  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const rgb1 = getRGB(color1);
  const rgb2 = getRGB(color2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// Check if color combination meets WCAG guidelines
export const meetsWCAGContrast = (
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA"
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return level === "AA" ? ratio >= 4.5 : ratio >= 7;
};

// Animation classes that respect reduced motion
export const getAnimationClasses = (
  animation: string,
  prefersReducedMotion: boolean = false
): string => {
  if (prefersReducedMotion) {
    return ""; // No animation for users who prefer reduced motion
  }
  return animation;
};
