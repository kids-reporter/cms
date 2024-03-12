-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "image" INTEGER;

-- CreateIndex
CREATE INDEX "Author_image_idx" ON "Author"("image");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_image_fkey" FOREIGN KEY ("image") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
