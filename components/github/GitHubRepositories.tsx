/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { getCardHoverClasses, getOverlayStyles } from "@/lib/card-animations";
import type { GitHubRepositoriesProps } from "@/types/github";

const LanguageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Shell: "#89e051",
  Vue: "#41b883",
  React: "#61dafb",
};

export default function GitHubRepositories({
  repositories,
}: GitHubRepositoriesProps) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;

    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center mb-4">
        <div
          className="inline-flex items-center justify-center gap-2 cursor-pointer bg-white dark:bg-black 
          hover:shadow-lg rounded-lg px-6 py-3 transition-all duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-slate-100 text-center select-none transition-colors whitespace-nowrap">
            Recent Repositories
          </h3>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex-shrink-0" />
          )}
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {repositories.slice(0, 3).map((repo, index) => {
            const isHovered = hoveredRepo === repo.name;
            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={getCardHoverClasses(isHovered)}
                  onMouseEnter={() => setHoveredRepo(repo.name)}
                  onMouseLeave={() => setHoveredRepo(null)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {repo.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          <FaStar className="mr-1 h-3 w-3" />
                          {repo.stargazers_count}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <GoRepoForked className="mr-1 h-3 w-3" />
                          {repo.forks_count}
                        </Badge>
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      {repo.language && (
                        <Badge variant="outline" className="text-xs">
                          <div
                            className="w-2 h-2 rounded-full mr-1"
                            style={{
                              backgroundColor:
                                LanguageColors[repo.language] || "#64748b",
                            }}
                          />
                          {repo.language}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Updated {formatTimeAgo(repo.updated_at)}
                      </Badge>
                    </div>
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {repo.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{repo.topics.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <div
                    className={`
                    absolute inset-0 rounded-lg transition-opacity duration-500
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                    style={getOverlayStyles(isHovered)}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
