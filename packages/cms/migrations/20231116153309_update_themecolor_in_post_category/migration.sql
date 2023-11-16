/*
  Warnings:

  - You are about to drop the column `themeColor` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "themeColor" TEXT DEFAULT 'blue';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "themeColor";
