import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   UPDATE "pages_blocks_features_items" SET "icon" = CASE
    WHEN "icon" IN ('search', 'briefcase', 'puzzle', 'chart', 'clock', 'check', 'shield', 'user', 'bell', 'zap', 'list', 'globe', 'star') THEN "icon"
    WHEN "icon" = '🔎' THEN 'search'
    WHEN "icon" = '🧩' THEN 'puzzle'
    WHEN "icon" = '📊' THEN 'chart'
    ELSE NULL
   END;
   CREATE TYPE "public"."enum_pages_blocks_features_items_icon" AS ENUM('search', 'briefcase', 'puzzle', 'chart', 'clock', 'check', 'shield', 'user', 'bell', 'zap', 'list', 'globe', 'star');
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_features_items_icon" USING "icon"::"public"."enum_pages_blocks_features_items_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "icon" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_pages_blocks_features_items_icon";`)
}
