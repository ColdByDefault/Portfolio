/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

// Library components exports
export { BooksShelf } from "./booksShelf";
export { OthersShelf } from "./othersShelf";
export { MediaCards } from "./shelfCard";

// Re-export types for convenience
export type {
  MediaItem,
  Book,
  Movie,
  Series,
  Game,
  Podcast,
  MediaCardsProps,
  MediaShelfProps,
} from "@/types/hubs/library";
