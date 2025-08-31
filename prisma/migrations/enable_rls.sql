-- Enable RLS on all tables
ALTER TABLE "public"."blog_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."blogs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."blog_credits" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."blog_tag_relations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."blog_tags" ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "blog_categories_public_read" ON "public"."blog_categories"
    FOR SELECT USING (true);

CREATE POLICY "blog_tags_public_read" ON "public"."blog_tags"
    FOR SELECT USING (true);

CREATE POLICY "blogs_public_read" ON "public"."blogs"
    FOR SELECT USING ("isPublished" = true AND "publishedAt" IS NOT NULL);

CREATE POLICY "blog_credits_public_read" ON "public"."blog_credits"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "public"."blogs" 
            WHERE "blogs"."id" = "blog_credits"."blogId" 
            AND "blogs"."isPublished" = true 
            AND "blogs"."publishedAt" IS NOT NULL
        )
    );

CREATE POLICY "blog_tag_relations_public_read" ON "public"."blog_tag_relations"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "public"."blogs" 
            WHERE "blogs"."id" = "blog_tag_relations"."blogId" 
            AND "blogs"."isPublished" = true 
            AND "blogs"."publishedAt" IS NOT NULL
        )
    );

-- Admin policies (use service_role for admin panel)
CREATE POLICY "admin_full_access_categories" ON "public"."blog_categories"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "admin_full_access_tags" ON "public"."blog_tags"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "admin_full_access_blogs" ON "public"."blogs"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "admin_full_access_credits" ON "public"."blog_credits"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "admin_full_access_relations" ON "public"."blog_tag_relations"
    FOR ALL USING (true) WITH CHECK (true);

-- Permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
