-- CreateTable
CREATE TABLE "NewsReadingGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "NewsReadingGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsReadingGroupItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "embedCode" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "NewsReadingGroupItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsReadingGroup_items" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "NewsReadingGroup_name_idx" ON "NewsReadingGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsReadingGroup_items_AB_unique" ON "_NewsReadingGroup_items"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsReadingGroup_items_B_index" ON "_NewsReadingGroup_items"("B");

-- AddForeignKey
ALTER TABLE "_NewsReadingGroup_items" ADD CONSTRAINT "_NewsReadingGroup_items_A_fkey" FOREIGN KEY ("A") REFERENCES "NewsReadingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsReadingGroup_items" ADD CONSTRAINT "_NewsReadingGroup_items_B_fkey" FOREIGN KEY ("B") REFERENCES "NewsReadingGroupItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
