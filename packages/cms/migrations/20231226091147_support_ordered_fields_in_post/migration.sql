-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "relatedPostsOrderJson" JSONB DEFAULT '[]',
ADD COLUMN     "subSubcategoriesOrderJson" JSONB DEFAULT '[]',
ADD COLUMN     "tagsOrderJson" JSONB DEFAULT '[]';
