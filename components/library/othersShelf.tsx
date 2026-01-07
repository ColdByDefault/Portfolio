/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import { MediaCards } from "@/components/library";
import { moviesData, seriesData, gamesData } from "@/data/hubs/libraryData";

export function OthersShelf() {
  // Combine all non-book media
  const otherMedia = [...moviesData, ...seriesData, ...gamesData];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Movies, Series & Games
        </h2>
      </div>
      <MediaCards
        items={otherMedia}
        emptyStateTitle="No Media Yet"
        emptyStateDescription="Movie, series, and game recommendations will be available here soon."
        showDetails={true}
      />
    </div>
  );
}
