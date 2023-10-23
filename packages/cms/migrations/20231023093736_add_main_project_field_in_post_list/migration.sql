-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mainProject" INTEGER;

-- CreateIndex
CREATE INDEX "Post_mainProject_idx" ON "Post"("mainProject");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mainProject_fkey" FOREIGN KEY ("mainProject") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
