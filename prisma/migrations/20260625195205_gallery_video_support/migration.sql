-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GalleryImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "kind" TEXT NOT NULL DEFAULT 'image',
    "filename" TEXT NOT NULL,
    "poster" TEXT NOT NULL DEFAULT '',
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "captionSr" TEXT NOT NULL DEFAULT '',
    "captionEn" TEXT NOT NULL DEFAULT '',
    "captionRu" TEXT NOT NULL DEFAULT '',
    "captionDe" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GalleryImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GalleryCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GalleryImage" ("captionDe", "captionEn", "captionRu", "captionSr", "categoryId", "createdAt", "filename", "height", "id", "order", "updatedAt", "width") SELECT "captionDe", "captionEn", "captionRu", "captionSr", "categoryId", "createdAt", "filename", "height", "id", "order", "updatedAt", "width" FROM "GalleryImage";
DROP TABLE "GalleryImage";
ALTER TABLE "new_GalleryImage" RENAME TO "GalleryImage";
CREATE INDEX "GalleryImage_categoryId_idx" ON "GalleryImage"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
