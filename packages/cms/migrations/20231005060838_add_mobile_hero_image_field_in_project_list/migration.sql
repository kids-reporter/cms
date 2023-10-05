-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "mobileHeroImage" INTEGER;

-- CreateIndex
CREATE INDEX "Project_mobileHeroImage_idx" ON "Project"("mobileHeroImage");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_mobileHeroImage_fkey" FOREIGN KEY ("mobileHeroImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
