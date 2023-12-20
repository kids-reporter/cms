-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- CreateIndex
CREATE INDEX "Post_createdBy_idx" ON "Post"("createdBy");

-- CreateIndex
CREATE INDEX "Post_updatedBy_idx" ON "Post"("updatedBy");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create default User with id = -1
INSERT INTO public."User" (id, name, email, password, role, "createdAt") VALUES (-1, 'Default', 'default', 'default_password', 'preview', CURRENT_TIMESTAMP);

-- Update Post records with empty createdBy to relate to User -1
UPDATE public."Post" SET "createdBy" = -1 WHERE "createdBy" IS NULL
