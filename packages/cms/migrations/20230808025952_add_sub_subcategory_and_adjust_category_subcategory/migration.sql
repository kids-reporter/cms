/*
  Warnings:

  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Category_relatedPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Category_subCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubCategory_relatedPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_category_fkey";

-- DropForeignKey
ALTER TABLE "_Category_relatedPost" DROP CONSTRAINT "_Category_relatedPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category_relatedPost" DROP CONSTRAINT "_Category_relatedPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_Category_subCategory" DROP CONSTRAINT "_Category_subCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category_subCategory" DROP CONSTRAINT "_Category_subCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubCategory_relatedPost" DROP CONSTRAINT "_SubCategory_relatedPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubCategory_relatedPost" DROP CONSTRAINT "_SubCategory_relatedPost_B_fkey";

-- DropTable
DROP TABLE "SubCategory";

-- DropTable
DROP TABLE "_Category_relatedPost";

-- DropTable
DROP TABLE "_Category_subCategory";

-- DropTable
DROP TABLE "_SubCategory_relatedPost";

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "nameForCMS" TEXT NOT NULL DEFAULT '',
    "status" TEXT,
    "category" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubSubcategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "nameForCMS" TEXT NOT NULL DEFAULT '',
    "status" TEXT,
    "subcategory" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SubSubcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Category_subcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_subSubcategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SubSubcategory_relatedPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Subcategory_subSubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_slug_key" ON "Subcategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_nameForCMS_key" ON "Subcategory"("nameForCMS");

-- CreateIndex
CREATE INDEX "Subcategory_category_idx" ON "Subcategory"("category");

-- CreateIndex
CREATE UNIQUE INDEX "SubSubcategory_slug_key" ON "SubSubcategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubSubcategory_nameForCMS_key" ON "SubSubcategory"("nameForCMS");

-- CreateIndex
CREATE INDEX "SubSubcategory_subcategory_idx" ON "SubSubcategory"("subcategory");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_subcategory_AB_unique" ON "_Category_subcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_subcategory_B_index" ON "_Category_subcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_subSubcategories_AB_unique" ON "_Post_subSubcategories"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_subSubcategories_B_index" ON "_Post_subSubcategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubSubcategory_relatedPost_AB_unique" ON "_SubSubcategory_relatedPost"("A", "B");

-- CreateIndex
CREATE INDEX "_SubSubcategory_relatedPost_B_index" ON "_SubSubcategory_relatedPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Subcategory_subSubcategory_AB_unique" ON "_Subcategory_subSubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_Subcategory_subSubcategory_B_index" ON "_Subcategory_subSubcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSubcategory" ADD CONSTRAINT "SubSubcategory_subcategory_fkey" FOREIGN KEY ("subcategory") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subcategory" ADD CONSTRAINT "_Category_subcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subcategory" ADD CONSTRAINT "_Category_subcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_subSubcategories" ADD CONSTRAINT "_Post_subSubcategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_subSubcategories" ADD CONSTRAINT "_Post_subSubcategories_B_fkey" FOREIGN KEY ("B") REFERENCES "SubSubcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubSubcategory_relatedPost" ADD CONSTRAINT "_SubSubcategory_relatedPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubSubcategory_relatedPost" ADD CONSTRAINT "_SubSubcategory_relatedPost_B_fkey" FOREIGN KEY ("B") REFERENCES "SubSubcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subcategory_subSubcategory" ADD CONSTRAINT "_Subcategory_subSubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "SubSubcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Subcategory_subSubcategory" ADD CONSTRAINT "_Subcategory_subSubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
