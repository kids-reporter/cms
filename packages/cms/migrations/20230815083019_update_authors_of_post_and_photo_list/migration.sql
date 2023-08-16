/*
  Warnings:

  - You are about to drop the column `heroImageSize` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfDesigners` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfEditors` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfEngineers` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfPhotographers` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfRelatedPosts` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfReviewers` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `manualOrderOfWriters` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `otherByline` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `readingTime` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_Post_designers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_editors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_engineers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_photographers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_reviewers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Post_designers" DROP CONSTRAINT "_Post_designers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_designers" DROP CONSTRAINT "_Post_designers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_editors" DROP CONSTRAINT "_Post_editors_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_editors" DROP CONSTRAINT "_Post_editors_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_engineers" DROP CONSTRAINT "_Post_engineers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_engineers" DROP CONSTRAINT "_Post_engineers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_photographers" DROP CONSTRAINT "_Post_photographers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_photographers" DROP CONSTRAINT "_Post_photographers_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_reviewers" DROP CONSTRAINT "_Post_reviewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_reviewers" DROP CONSTRAINT "_Post_reviewers_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "heroImageSize",
DROP COLUMN "manualOrderOfDesigners",
DROP COLUMN "manualOrderOfEditors",
DROP COLUMN "manualOrderOfEngineers",
DROP COLUMN "manualOrderOfPhotographers",
DROP COLUMN "manualOrderOfRelatedPosts",
DROP COLUMN "manualOrderOfReviewers",
DROP COLUMN "manualOrderOfWriters",
DROP COLUMN "otherByline",
DROP COLUMN "readingTime",
ADD COLUMN     "authorsJSON" JSONB DEFAULT '[]';

-- DropTable
DROP TABLE "_Post_designers";

-- DropTable
DROP TABLE "_Post_editors";

-- DropTable
DROP TABLE "_Post_engineers";

-- DropTable
DROP TABLE "_Post_photographers";

-- DropTable
DROP TABLE "_Post_reviewers";

-- CreateTable
CREATE TABLE "_Photo_authors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Photo_authors_AB_unique" ON "_Photo_authors"("A", "B");

-- CreateIndex
CREATE INDEX "_Photo_authors_B_index" ON "_Photo_authors"("B");

-- AddForeignKey
ALTER TABLE "_Photo_authors" ADD CONSTRAINT "_Photo_authors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Photo_authors" ADD CONSTRAINT "_Photo_authors_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
