-- CreateEnum
CREATE TYPE "ERoles" AS ENUM ('superadmin', 'admin', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ERoles";
