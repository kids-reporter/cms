/*
  Warnings:

  - Made the column `subtitle` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otherByline` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `heroCaption` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ogTitle` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ogDescription` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "subtitle" SET NOT NULL,
ALTER COLUMN "subtitle" SET DEFAULT '',
ALTER COLUMN "otherByline" SET NOT NULL,
ALTER COLUMN "otherByline" SET DEFAULT '',
ALTER COLUMN "heroCaption" SET NOT NULL,
ALTER COLUMN "heroCaption" SET DEFAULT '',
ALTER COLUMN "ogTitle" SET NOT NULL,
ALTER COLUMN "ogTitle" SET DEFAULT '',
ALTER COLUMN "ogDescription" SET NOT NULL,
ALTER COLUMN "ogDescription" SET DEFAULT '';
