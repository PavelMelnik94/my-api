/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `MetaInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `MetaInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `MetaInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MetaInformation" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "metaTags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "MetaInformation_description_key" ON "MetaInformation"("description");
