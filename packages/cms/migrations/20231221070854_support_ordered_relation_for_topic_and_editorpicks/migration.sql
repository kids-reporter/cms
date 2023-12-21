-- AlterTable
ALTER TABLE "EditorPicksSetting" ADD COLUMN     "editorPicksOfPosts_order_json" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "relatedPosts_order_json" JSONB DEFAULT '[]';
