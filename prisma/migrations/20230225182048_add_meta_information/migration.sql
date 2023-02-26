-- CreateTable
CREATE TABLE "MetaInformation" (
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaInformation_title_key" ON "MetaInformation"("title");
