import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import packageJson from "../package.json";

/**
 * Gets the version from package.json
 * @returns The current version of the portfolio
 */
export function getPortfolioVersion(): string {
  return packageJson.version;
}
