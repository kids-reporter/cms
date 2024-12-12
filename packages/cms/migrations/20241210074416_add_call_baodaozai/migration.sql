-- CreateTable
CREATE TABLE "CallBaodaozai" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "nameTC" TEXT NOT NULL DEFAULT '',
    "home" JSONB,
    "topics" JSONB,
    "topic" JSONB,
    "news" JSONB,
    "comics" JSONB,
    "lessons" JSONB,
    "podcasts" JSONB,
    "aboutUs" JSONB,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CallBaodaozai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CallBaodaozai_name_key" ON "CallBaodaozai"("name");
