-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT NOT NULL DEFAULT '',
    "state" TEXT DEFAULT 'draft',
    "introduction" JSONB,
    "publishedDate" TIMESTAMP(3),
    "heroImage" INTEGER,
    "ogTitle" TEXT NOT NULL DEFAULT '',
    "ogDescription" TEXT NOT NULL DEFAULT '',
    "ogImage" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Post_projects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Project_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_projects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_state_idx" ON "Project"("state");

-- CreateIndex
CREATE INDEX "Project_publishedDate_idx" ON "Project"("publishedDate");

-- CreateIndex
CREATE INDEX "Project_heroImage_idx" ON "Project"("heroImage");

-- CreateIndex
CREATE INDEX "Project_ogImage_idx" ON "Project"("ogImage");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_projects_AB_unique" ON "_Post_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_projects_B_index" ON "_Post_projects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_tags_AB_unique" ON "_Project_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_tags_B_index" ON "_Project_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_projects_AB_unique" ON "_Category_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_projects_B_index" ON "_Category_projects"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_projects" ADD CONSTRAINT "_Post_projects_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_projects" ADD CONSTRAINT "_Post_projects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags" ADD CONSTRAINT "_Project_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_tags" ADD CONSTRAINT "_Project_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_projects" ADD CONSTRAINT "_Category_projects_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_projects" ADD CONSTRAINT "_Category_projects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
