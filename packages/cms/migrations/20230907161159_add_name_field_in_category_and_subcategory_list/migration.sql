/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';
UPDATE "Category" SET "name" = title;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';
UPDATE "Subcategory" SET "name" = title;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
