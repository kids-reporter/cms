-- AlterTable
ALTER TABLE "EditorPicksSetting" ADD COLUMN     "editorPicksOfPostsOrderJson" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "relatedPostsOrderJson" JSONB DEFAULT '[]';
