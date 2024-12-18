-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "essayQuestionsJSON" JSONB DEFAULT '[]',
ADD COLUMN     "multipleChoiceQuestionsJSON" JSONB DEFAULT '[]';
