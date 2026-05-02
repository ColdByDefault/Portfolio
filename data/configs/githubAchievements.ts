/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import type { GitHubAchievement } from "@/types/configs/github";

export const githubAchievements: GitHubAchievement[] = [
  {
    name: "Pull Shark x2",
    icon: "🦈",
    description: "Opened pull requests that have been merged",
    tier: "silver",
  },
  {
    name: "Pair Extraordinaire x2",
    icon: "👥",
    description: "Co-authored commits on merged pull requests",
    tier: "silver",
  },
  {
    name: "Galaxy Brain",
    icon: "🧠",
    description: "Answered a discussion with an accepted answer",
    tier: "bronze",
  },
  {
    name: "YOLO",
    icon: "🤠",
    description: "Merged a pull request without code review",
  },
  {
    name: "Starstruck",
    icon: "🌟",
    description: "Created a repository that has many stars",
    tier: "bronze",
  },
];
