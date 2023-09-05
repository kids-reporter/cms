-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "newsReadingGroup" INTEGER;

-- CreateIndex
CREATE INDEX "Post_newsReadingGroup_idx" ON "Post"("newsReadingGroup");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_newsReadingGroup_fkey" FOREIGN KEY ("newsReadingGroup") REFERENCES "NewsReadingGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
