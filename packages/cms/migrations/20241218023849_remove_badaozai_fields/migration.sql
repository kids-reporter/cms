/*
  Warnings:

  - You are about to drop the column `name` on the `CallBaodaozai` table. All the data in the column will be lost.
  - You are about to drop the column `nameTC` on the `CallBaodaozai` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CallBaodaozai_name_key";

-- AlterTable
ALTER TABLE "CallBaodaozai" DROP COLUMN "name",
DROP COLUMN "nameTC";
