/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { MediaCards } from "@/components/library";
import { booksData } from "@/data/libraryData";

export function BooksShelf() {

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Books
        </h2>
      </div>
      <MediaCards
        items={booksData}
        emptyStateTitle="No Books Yet"
        emptyStateDescription="Book recommendations will be available here soon."
        showDetails={true}
      />
    </div>
  );
}
