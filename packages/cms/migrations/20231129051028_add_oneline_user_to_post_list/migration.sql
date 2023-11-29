-- CreateTable
CREATE TABLE "_Post_onlineUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Post_onlineUsers_AB_unique" ON "_Post_onlineUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_onlineUsers_B_index" ON "_Post_onlineUsers"("B");

-- AddForeignKey
ALTER TABLE "_Post_onlineUsers" ADD CONSTRAINT "_Post_onlineUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_onlineUsers" ADD CONSTRAINT "_Post_onlineUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
