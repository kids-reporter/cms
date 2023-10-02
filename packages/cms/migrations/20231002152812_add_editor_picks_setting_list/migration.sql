-- CreateTable
CREATE TABLE "EditorPicksSetting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "nameForCMS" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EditorPicksSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EditorPicksSetting_editorPicksOfPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EditorPicksSetting_editorPicksOfProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EditorPicksSetting_editorPicksOfTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EditorPicksSetting_name_key" ON "EditorPicksSetting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EditorPicksSetting_editorPicksOfPosts_AB_unique" ON "_EditorPicksSetting_editorPicksOfPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_EditorPicksSetting_editorPicksOfPosts_B_index" ON "_EditorPicksSetting_editorPicksOfPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EditorPicksSetting_editorPicksOfProjects_AB_unique" ON "_EditorPicksSetting_editorPicksOfProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_EditorPicksSetting_editorPicksOfProjects_B_index" ON "_EditorPicksSetting_editorPicksOfProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EditorPicksSetting_editorPicksOfTags_AB_unique" ON "_EditorPicksSetting_editorPicksOfTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EditorPicksSetting_editorPicksOfTags_B_index" ON "_EditorPicksSetting_editorPicksOfTags"("B");

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfPosts" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "EditorPicksSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfPosts" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfProjects" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "EditorPicksSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfProjects" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfTags" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfTags_A_fkey" FOREIGN KEY ("A") REFERENCES "EditorPicksSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorPicksSetting_editorPicksOfTags" ADD CONSTRAINT "_EditorPicksSetting_editorPicksOfTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
