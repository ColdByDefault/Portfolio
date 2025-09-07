/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { BooksShelf, OthersShelf } from "@/components/library";
import { useTranslations } from "next-intl";

export default function LibraryPage() {
  const t = useTranslations("Library");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
      <div className="border-b border-border/70 mb-12"></div>
      <div className="flex flex-col gap-16">
        <BooksShelf />
        <OthersShelf />
      </div>
    </div>
  );
}
