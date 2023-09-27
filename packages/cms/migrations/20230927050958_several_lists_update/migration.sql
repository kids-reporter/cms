/*
  Warnings:

  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SubSubcategory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `isProtected` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_title_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "SubSubcategory" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "status",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isProtected";
