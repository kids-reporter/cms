/*
  Warnings:

  - You are about to drop the `_Post_onlineUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Post_onlineUsers" DROP CONSTRAINT "_Post_onlineUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_onlineUsers" DROP CONSTRAINT "_Post_onlineUsers_B_fkey";

-- DropTable
DROP TABLE "_Post_onlineUsers";

-- CreateTable
CREATE TABLE "OnlineUser" (
    "id" TEXT NOT NULL,
    "user" INTEGER,
    "canonicalPath" TEXT NOT NULL DEFAULT '',
    "lastOnlineAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OnlineUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OnlineUser_user_idx" ON "OnlineUser"("user");

-- CreateIndex
CREATE INDEX "OnlineUser_canonicalPath_idx" ON "OnlineUser"("canonicalPath");

-- CreateIndex
CREATE INDEX "OnlineUser_lastOnlineAt_idx" ON "OnlineUser"("lastOnlineAt");

-- AddForeignKey
ALTER TABLE "OnlineUser" ADD CONSTRAINT "OnlineUser_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
