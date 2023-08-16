/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

UPDATE "Author" SET "slug" = name WHERE "slug" = '';

-- CreateIndex
CREATE UNIQUE INDEX "Author_slug_key" ON "Author"("slug");
