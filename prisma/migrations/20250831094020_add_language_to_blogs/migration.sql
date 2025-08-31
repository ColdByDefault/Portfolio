-- AlterTable
ALTER TABLE "public"."blogs" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en';

-- CreateIndex
CREATE INDEX "blogs_language_idx" ON "public"."blogs"("language");

-- CreateIndex
CREATE INDEX "blogs_language_isPublished_idx" ON "public"."blogs"("language", "isPublished");
