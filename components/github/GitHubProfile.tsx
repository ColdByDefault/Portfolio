/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaGithub, FaStar, FaCode, FaUsers } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  most_used_language: string;
  languages: Record<string, number>;
}

interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  html_url: string;
}

interface GitHubProfileProps {
  profile: GitHubProfile;
  stats: GitHubStats;
}

export default function GitHubProfile({ profile, stats }: GitHubProfileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`
                  relative overflow-hidden transition-all duration-500 ease-out group
                  ${isHovered ? "border-gray-500/50 bg-white shadow-2xl" : ""}
                  ${
                    isHovered
                      ? "dark:bg-black dark:shadow-yellow-500/20 dark:border-yellow-500/50 bg-white shadow-blue-200/20"
                      : ""
                  }
                  `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Profile Info */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                width={56}
                height={56}
                src={profile.avatar_url}
                alt={profile.name}
                className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-700"
              />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {profile.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  @{profile.login}
                </Badge>
              </div>
            </div>
            {profile.bio && (
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                {profile.bio}
              </p>
            )}
            <div className="flex justify-start gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="cursor-pointer hover:bg-primary/10 relative z-10"
              >
                <Link
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 cursor-pointer text-center w-full"
                >
                  <FaGithub className="h-4 w-4" />
                  View Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center py-3  rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaCode className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Repos
                </span>
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                {stats.public_repos}
              </div>
            </div>

            <div className="text-center py-3  rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaStar className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Stars
                </span>
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                {stats.total_stars}
              </div>
            </div>

            <div className="text-center py-3  rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaUsers className="h-3 w-3 text-green-600 dark:text-green-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Followers
                </span>
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                {stats.followers}
              </div>
            </div>
            <div className="text-center py-3 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <GoRepoForked className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Forks
                </span>
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                3
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div
        className={`
                    absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
        style={{
          backgroundImage: isHovered
            ? `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%),
               linear-gradient(-45deg, transparent 30%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)`
            : "none",
          backgroundSize: "200% 200%",
          animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
        }}
      />
      {/* Dark mode gradient overlay */}
      <div
        className={`
                    absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none dark:block hidden
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
        style={{
          backgroundImage: isHovered
            ? `linear-gradient(45deg, transparent 30%, rgba(218, 165, 32, 0.09) 50%, transparent 70%),
               linear-gradient(-45deg, transparent 30%, rgba(255, 215, 0, 0.09) 50%, transparent 70%)`
            : "none",
          backgroundSize: "200% 200%",
          animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
        }}
      />
      <style jsx global>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </Card>
  );
}
