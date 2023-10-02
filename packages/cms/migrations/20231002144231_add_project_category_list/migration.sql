/*
  Warnings:

  - You are about to drop the `_Category_projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Category_projects" DROP CONSTRAINT "_Category_projects_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category_projects" DROP CONSTRAINT "_Category_projects_B_fkey";

-- DropTable
DROP TABLE "_Category_projects";

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "heroImage" INTEGER,
    "ogTitle" TEXT NOT NULL DEFAULT '',
    "ogDescription" TEXT NOT NULL DEFAULT '',
    "ogImage" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Project_projectCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategory_slug_key" ON "ProjectCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategory_name_key" ON "ProjectCategory"("name");

-- CreateIndex
CREATE INDEX "ProjectCategory_heroImage_idx" ON "ProjectCategory"("heroImage");

-- CreateIndex
CREATE INDEX "ProjectCategory_ogImage_idx" ON "ProjectCategory"("ogImage");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_projectCategories_AB_unique" ON "_Project_projectCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_projectCategories_B_index" ON "_Project_projectCategories"("B");

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_projectCategories" ADD CONSTRAINT "_Project_projectCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_projectCategories" ADD CONSTRAINT "_Project_projectCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
