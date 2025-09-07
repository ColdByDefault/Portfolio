/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Film,
  Tv,
  Headphones,
  Gamepad2,
  Clock,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MediaCardsProps, MediaItem } from "@/types/library";

const getMediaIcon = (type: MediaItem["type"]) => {
  const iconProps = { className: "h-5 w-5" };

  switch (type) {
    case "book":
      return <BookOpen {...iconProps} />;
    case "movie":
      return <Film {...iconProps} />;
    case "series":
      return <Tv {...iconProps} />;
    case "podcast":
      return <Headphones {...iconProps} />;
    case "game":
      return <Gamepad2 {...iconProps} />;
    default:
      return <BookOpen {...iconProps} />;
  }
};

const getItemUrl = (item: MediaItem): string => {
  switch (item.type) {
    case "book":
      return item.goodreadsUrl || item.amazonUrl || "";
    case "movie":
    case "series":
      return item.imdbUrl || "";
    case "podcast":
      return item.spotifyUrl || item.appleUrl || "";
    case "game":
      return item.steamUrl || "";
    default:
      return "";
  }
};

function MediaCard({
  item,
  onItemClick,
  showDetails = false,
}: {
  item: MediaItem;
  onItemClick?: (item: MediaItem) => void;
  showDetails?: boolean;
}) {
  const getItemDetails = () => {
    switch (item.type) {
      case "book":
        return {
          subtitle: item.author,
          details: item.pages ? `${item.pages} pages` : undefined,
          year: item.publishedYear,
        };
      case "movie":
        return {
          subtitle: item.director,
          details: item.duration ? `${item.duration} min` : undefined,
          year: item.releaseYear,
        };
      case "series":
        return {
          subtitle: item.creator,
          details: `${item.seasons} season${item.seasons > 1 ? "s" : ""}`,
          year: item.releaseYear,
        };
      case "podcast":
        return {
          subtitle: item.host,
          details: item.episodes ? `${item.episodes} episodes` : undefined,
          year: undefined,
        };
      case "game":
        return {
          subtitle: item.developer,
          details: item.platform?.join(", "),
          year: item.releaseYear,
        };
      default:
        return { subtitle: "", details: undefined, year: undefined };
    }
  };

  const { subtitle, details, year } = getItemDetails();
  const itemUrl = getItemUrl(item);

  const cardContent = (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden",
        onItemClick && "hover:border-primary/50"
      )}
      onClick={() => onItemClick?.(item)}
    >
      {/* Image section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.imageUrl || "/default.png"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
            {getMediaIcon(item.type)}
          </div>
        </div>
        {itemUrl && (
          <div className="absolute top-2 right-2">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div>
            <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {details && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{details}</span>
              </div>
            )}
            {year && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{year}</span>
              </div>
            )}
          </div>

          {showDetails && item.description && (
            <CardContent className="px-0 pb-0 pt-2">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </CardContent>
          )}
        </div>
      </CardHeader>
    </Card>
  );

  // Wrap with Link if URL exists, otherwise return the card as is
  if (itemUrl) {
    return (
      <Link
        href={itemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export function MediaCards({
  items = [],
  emptyStateTitle = "Coming Soon",
  emptyStateDescription = "Content will be available here soon.",
  onItemClick,
  showDetails = false,
  className,
}: MediaCardsProps) {

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
      >
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardHeader className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <CardTitle className="text-muted-foreground">
              {emptyStateTitle}
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground/75">
                {emptyStateDescription}
              </p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          {...(onItemClick && { onItemClick })}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
}
