-- DropIndex
DROP INDEX "Todo_description_key";

-- DropIndex
DROP INDEX "Todo_title_key";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT;
