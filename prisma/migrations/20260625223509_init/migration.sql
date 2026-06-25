-- CreateTable
CREATE TABLE "GalleryCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "nameSr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "nameDe" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GalleryImage" (
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

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleSr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleRu" TEXT NOT NULL DEFAULT '',
    "titleDe" TEXT NOT NULL DEFAULT '',
    "subtitleSr" TEXT NOT NULL DEFAULT '',
    "subtitleEn" TEXT NOT NULL DEFAULT '',
    "subtitleRu" TEXT NOT NULL DEFAULT '',
    "subtitleDe" TEXT NOT NULL DEFAULT '',
    "badgeSr" TEXT NOT NULL DEFAULT '',
    "badgeEn" TEXT NOT NULL DEFAULT '',
    "badgeRu" TEXT NOT NULL DEFAULT '',
    "badgeDe" TEXT NOT NULL DEFAULT '',
    "descriptionSr" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "descriptionDe" TEXT NOT NULL DEFAULT '',
    "totalAreaM2" REAL,
    "sitePlanTop" TEXT,
    "sitePlanLeft" TEXT,
    "coverFilename" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "filename" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "captionSr" TEXT NOT NULL DEFAULT '',
    "captionEn" TEXT NOT NULL DEFAULT '',
    "captionRu" TEXT NOT NULL DEFAULT '',
    "captionDe" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectHighlight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT NOT NULL DEFAULT 'LuDot',
    "value" TEXT NOT NULL DEFAULT '',
    "labelSr" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL DEFAULT '',
    "labelRu" TEXT NOT NULL DEFAULT '',
    "labelDe" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "ProjectHighlight_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "area" TEXT NOT NULL DEFAULT '',
    "nameSr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "nameDe" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "ProjectRoom_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'visit',
    "name" TEXT NOT NULL DEFAULT '',
    "path" TEXT NOT NULL DEFAULT '',
    "locale" TEXT NOT NULL DEFAULT '',
    "referrer" TEXT NOT NULL DEFAULT '',
    "device" TEXT NOT NULL DEFAULT '',
    "visitorHash" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryCategory_slug_key" ON "GalleryCategory"("slug");

-- CreateIndex
CREATE INDEX "GalleryImage_categoryId_idx" ON "GalleryImage"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "ProjectImage_projectId_idx" ON "ProjectImage"("projectId");

-- CreateIndex
CREATE INDEX "ProjectHighlight_projectId_idx" ON "ProjectHighlight"("projectId");

-- CreateIndex
CREATE INDEX "ProjectRoom_projectId_idx" ON "ProjectRoom"("projectId");

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

-- CreateIndex
CREATE INDEX "PageView_type_idx" ON "PageView"("type");

-- CreateIndex
CREATE UNIQUE INDEX "PageView_visitorHash_type_name_key" ON "PageView"("visitorHash", "type", "name");
