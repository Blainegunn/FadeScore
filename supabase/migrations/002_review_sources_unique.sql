-- Add unique constraint on (shop_id, platform) for review_sources
-- This enables upsert on conflict for the Booksy scraper and other platform imports
ALTER TABLE review_sources ADD CONSTRAINT review_sources_shop_platform_unique UNIQUE (shop_id, platform);
