-- AlterTable
ALTER TABLE "MetaInformation" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MetaInformation_pkey" PRIMARY KEY ("id");
