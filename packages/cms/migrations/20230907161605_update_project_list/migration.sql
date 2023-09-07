/*
  Warnings:

  - You are about to drop the column `introduction` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_state_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "introduction",
DROP COLUMN "state",
ADD COLUMN     "content" JSONB,
ADD COLUMN     "status" TEXT DEFAULT 'draft';

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");
