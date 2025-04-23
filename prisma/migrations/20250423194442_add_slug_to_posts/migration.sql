/*
  Warnings:

  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "thumbUrl" TEXT,
    "url" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "averageRating" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "favouriteId" TEXT,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Generate slugs for existing posts
WITH RECURSIVE
  slugified AS (
    SELECT 
      id,
      title,
      LOWER(REPLACE(REPLACE(REPLACE(title, ' ', '-'), '.', ''), ',', '')) as base_slug
    FROM "Post"
  ),
  numbered_slugs AS (
    SELECT 
      s1.id,
      s1.title,
      CASE 
        WHEN COUNT(s2.id) = 0 THEN s1.base_slug
        ELSE s1.base_slug || '-' || (COUNT(s2.id))
      END as final_slug
    FROM slugified s1
    LEFT JOIN slugified s2 
      ON s2.base_slug = s1.base_slug 
      AND s2.id < s1.id
    GROUP BY s1.id, s1.title, s1.base_slug
  )
INSERT INTO "new_Post" (
  "id", "title", "slug", "description", "content", "thumbUrl", "url", 
  "published", "averageRating", "createdAt", "upadatedAt", "authorId", "favouriteId"
)
SELECT 
  p.id, p.title, ns.final_slug, p.description, p.content, p.thumbUrl, p.url,
  p.published, p.averageRating, p.createdAt, p.upadatedAt, p.authorId, p.favouriteId
FROM "Post" p
JOIN numbered_slugs ns ON p.id = ns.id;

DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
