/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Film,
  Tv,
  Headphones,
  Gamepad2,
  Clock,
  Calendar,
  ExternalLink,
  Star,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MediaCardsProps, MediaItem } from "@/types/hubs/library";

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
          extraDetails: item.isbn ? `ISBN: ${item.isbn}` : undefined,
        };
      case "movie":
        return {
          subtitle: item.director,
          details: item.duration ? `${item.duration} min` : undefined,
          year: item.releaseYear,
          extraDetails: undefined,
        };
      case "series":
        return {
          subtitle: item.creator,
          details: `${item.seasons} season${item.seasons > 1 ? "s" : ""}`,
          year: item.releaseYear,
          extraDetails: item.episodes ? `${item.episodes} episodes` : undefined,
        };
      case "podcast":
        return {
          subtitle: item.host,
          details: item.episodes ? `${item.episodes} episodes` : undefined,
          year: undefined,
          extraDetails: item.platform ? `${item.platform}` : undefined,
        };
      case "game":
        return {
          subtitle: item.developer,
          details: item.platform?.join(", "),
          year: item.releaseYear,
          extraDetails: item.metacriticScore
            ? `Score: ${item.metacriticScore}`
            : undefined,
        };
      default:
        return {
          subtitle: "",
          details: undefined,
          year: undefined,
          extraDetails: undefined,
        };
    }
  };

  const { subtitle, details, year, extraDetails } = getItemDetails();
  const itemUrl = getItemUrl(item);

  const cardContent = (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden p-0",
        onItemClick && "hover:border-primary/50"
      )}
      onClick={() => onItemClick?.(item)}
    >
      <CardContent className="px-2 flex flex-col gap-2 border h-full p-3">
        {/* TOP SECTION: Header (Icon, Title, Author) - 1/4 */}
        <div className="shrink-0 space-y-1">
          {/* Icon and Title */}
          <div className="flex items-center gap-2">
            <div className="shrink-0 p-1 rounded bg-primary/10 text-primary">
              {getMediaIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </CardTitle>
            </div>
            {itemUrl && (
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            )}
          </div>

          {/* Author/Director/Creator */}
          {subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {subtitle}
            </p>
          )}

          {/* Genre Tags */}
          {item.genre && item.genre.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.genre.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-secondary/50 text-secondary-foreground"
                >
                  {genre}
                </span>
              ))}
              {item.genre.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{item.genre.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="border-b border-border/50"></div>
        </div>

        {/* MIDDLE SECTION: Description - 2/4 */}
        <div className="flex-1 flex items-center py-1">
          {showDetails && item.description ? (
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          ) : (
            <div className="w-full"></div>
          )}
        </div>

        {/* BOTTOM SECTION: Details, Year, and Extra Info - 1/4 */}
        <div className="shrink-0 space-y-1">
          {/* Primary Details Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {year && (
                <>
                  <Calendar className="h-3 w-3" />
                  <span>{year}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {details && (
                <>
                  <Clock className="h-3 w-3" />
                  <span>{details}</span>
                </>
              )}
            </div>
          </div>

          {/* Extra Details Row */}
          {extraDetails && (
            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {item.type === "game" && item.metacriticScore && (
                  <>
                    <Star className="h-3 w-3" />
                    <span>{extraDetails}</span>
                  </>
                )}
                {item.type === "series" && item.episodes && (
                  <>
                    <Hash className="h-3 w-3" />
                    <span>{extraDetails}</span>
                  </>
                )}
                {(item.type === "book" || item.type === "podcast") && (
                  <span>{extraDetails}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
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
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
          className
        )}
      >
        <Card className="border-dashed border-2 border-muted-foreground/25 h-full">
          <CardContent className="p-3 h-full flex flex-col items-center justify-center text-center min-h-37.5">
            <BookOpen className="h-6 w-6 text-muted-foreground/50 mb-2" />
            <CardTitle className="text-sm text-muted-foreground mb-1">
              {emptyStateTitle}
            </CardTitle>
            <p className="text-xs text-muted-foreground/75">
              {emptyStateDescription}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
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
