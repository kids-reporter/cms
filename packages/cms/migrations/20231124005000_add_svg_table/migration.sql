-- CreateTable
CREATE TABLE "SVG" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "svgFile_filesize" INTEGER,
    "svgFile_filename" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SVG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SVG_authors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SVG_authors_AB_unique" ON "_SVG_authors"("A", "B");

-- CreateIndex
CREATE INDEX "_SVG_authors_B_index" ON "_SVG_authors"("B");

-- AddForeignKey
ALTER TABLE "_SVG_authors" ADD CONSTRAINT "_SVG_authors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SVG_authors" ADD CONSTRAINT "_SVG_authors_B_fkey" FOREIGN KEY ("B") REFERENCES "SVG"("id") ON DELETE CASCADE ON UPDATE CASCADE;
