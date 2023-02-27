-- AlterTable
ALTER TABLE "MetaInformation" ALTER COLUMN "title" SET DEFAULT 'My site',
ALTER COLUMN "description" SET DEFAULT 'Description of my site',
ALTER COLUMN "metaTags" SET DEFAULT ARRAY['ecommerce', 'finance']::TEXT[];
