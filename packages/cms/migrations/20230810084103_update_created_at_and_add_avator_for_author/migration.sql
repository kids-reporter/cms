/*
  Warnings:

  - Made the column `email` on table `Author` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "avatar" INTEGER,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PDF" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SubSubcategory" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Subcategory" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Author_avatar_idx" ON "Author"("avatar");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_avatar_fkey" FOREIGN KEY ("avatar") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
