-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "bio" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "status" TEXT,
    "heroImage" INTEGER,
    "ogTitle" TEXT NOT NULL DEFAULT '',
    "ogDescription" TEXT NOT NULL DEFAULT '',
    "ogImage" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "imageFile_filesize" INTEGER,
    "imageFile_extension" TEXT,
    "imageFile_width" INTEGER,
    "imageFile_height" INTEGER,
    "imageFile_id" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT,
    "status" TEXT DEFAULT 'draft',
    "publishedDate" TIMESTAMP(3),
    "manualOrderOfWriters" JSONB,
    "manualOrderOfPhotographers" JSONB,
    "manualOrderOfEditors" JSONB,
    "manualOrderOfDesigners" JSONB,
    "manualOrderOfEngineers" JSONB,
    "manualOrderOfReviewers" JSONB,
    "otherByline" TEXT,
    "heroImage" INTEGER,
    "heroCaption" TEXT,
    "heroImageSize" TEXT DEFAULT 'normal',
    "brief" JSONB,
    "content" JSONB,
    "readingTime" INTEGER,
    "manualOrderOfRelatedPosts" JSONB,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "status" TEXT,
    "category" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isProtected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Author_posts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_photographers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_editors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_designers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_engineers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_reviewers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_subCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_relatedPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_relatedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SubCategory_relatedPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE INDEX "Category_heroImage_idx" ON "Category"("heroImage");

-- CreateIndex
CREATE INDEX "Category_ogImage_idx" ON "Category"("ogImage");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "Post_publishedDate_idx" ON "Post"("publishedDate");

-- CreateIndex
CREATE INDEX "Post_heroImage_idx" ON "Post"("heroImage");

-- CreateIndex
CREATE INDEX "Post_ogImage_idx" ON "Post"("ogImage");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_title_key" ON "SubCategory"("title");

-- CreateIndex
CREATE INDEX "SubCategory_category_idx" ON "SubCategory"("category");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_Author_posts_AB_unique" ON "_Author_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Author_posts_B_index" ON "_Author_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_photographers_AB_unique" ON "_Post_photographers"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_photographers_B_index" ON "_Post_photographers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_editors_AB_unique" ON "_Post_editors"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_editors_B_index" ON "_Post_editors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_designers_AB_unique" ON "_Post_designers"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_designers_B_index" ON "_Post_designers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_engineers_AB_unique" ON "_Post_engineers"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_engineers_B_index" ON "_Post_engineers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_reviewers_AB_unique" ON "_Post_reviewers"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_reviewers_B_index" ON "_Post_reviewers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_subCategory_AB_unique" ON "_Category_subCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_subCategory_B_index" ON "_Category_subCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_relatedPost_AB_unique" ON "_Category_relatedPost"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_relatedPost_B_index" ON "_Category_relatedPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_relatedPosts_AB_unique" ON "_Post_relatedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_relatedPosts_B_index" ON "_Post_relatedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubCategory_relatedPost_AB_unique" ON "_SubCategory_relatedPost"("A", "B");

-- CreateIndex
CREATE INDEX "_SubCategory_relatedPost_B_index" ON "_SubCategory_relatedPost"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_heroImage_fkey" FOREIGN KEY ("heroImage") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ogImage_fkey" FOREIGN KEY ("ogImage") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Author_posts" ADD CONSTRAINT "_Author_posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Author_posts" ADD CONSTRAINT "_Author_posts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_photographers" ADD CONSTRAINT "_Post_photographers_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_photographers" ADD CONSTRAINT "_Post_photographers_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_editors" ADD CONSTRAINT "_Post_editors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_editors" ADD CONSTRAINT "_Post_editors_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_designers" ADD CONSTRAINT "_Post_designers_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_designers" ADD CONSTRAINT "_Post_designers_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_engineers" ADD CONSTRAINT "_Post_engineers_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_engineers" ADD CONSTRAINT "_Post_engineers_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_reviewers" ADD CONSTRAINT "_Post_reviewers_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_reviewers" ADD CONSTRAINT "_Post_reviewers_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subCategory" ADD CONSTRAINT "_Category_subCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subCategory" ADD CONSTRAINT "_Category_subCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_relatedPost" ADD CONSTRAINT "_Category_relatedPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_relatedPost" ADD CONSTRAINT "_Category_relatedPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_relatedPosts" ADD CONSTRAINT "_Post_relatedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_relatedPosts" ADD CONSTRAINT "_Post_relatedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubCategory_relatedPost" ADD CONSTRAINT "_SubCategory_relatedPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubCategory_relatedPost" ADD CONSTRAINT "_SubCategory_relatedPost_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
