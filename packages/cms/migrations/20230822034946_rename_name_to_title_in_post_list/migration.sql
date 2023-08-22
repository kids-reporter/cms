/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "title" TEXT NOT NULL DEFAULT '';

UPDATE "Post" SET "title" = name;

ALTER TABLE "Post" DROP COLUMN "name";
