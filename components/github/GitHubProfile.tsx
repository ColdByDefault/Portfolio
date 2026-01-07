/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
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
import {
  getCardHoverClasses,
  getOverlayStyles,
} from "@/components/visuals/card-animations";
import type { GitHubProfile, GitHubStats } from "@/types/configs/github";

interface GitHubProfileProps {
  profile: GitHubProfile;
  stats: GitHubStats;
}

export default function GitHubProfile({ profile, stats }: GitHubProfileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={getCardHoverClasses(isHovered)}
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
                alt={`${profile.name || profile.login} GitHub profile picture`}
                className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-700"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
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
        style={getOverlayStyles(isHovered)}
      />
    </Card>
  );
}
