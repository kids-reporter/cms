/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_heroImage_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_ogImage_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_heroImage_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_ogImage_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "imageFile_filesize" INTEGER,
    "imageFile_extension" TEXT,
    "imageFile_width" INTEGER,
    "imageFile_height" INTEGER,
    "imageFile_id" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
