/*
  Warnings:

  - You are about to drop the `_Category_subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubSubcategory_relatedPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Subcategory_subSubcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Category_subcategory" DROP CONSTRAINT "_Category_subcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category_subcategory" DROP CONSTRAINT "_Category_subcategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubSubcategory_relatedPost" DROP CONSTRAINT "_SubSubcategory_relatedPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubSubcategory_relatedPost" DROP CONSTRAINT "_SubSubcategory_relatedPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_Subcategory_subSubcategory" DROP CONSTRAINT "_Subcategory_subSubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_Subcategory_subSubcategory" DROP CONSTRAINT "_Subcategory_subSubcategory_B_fkey";

-- DropTable
DROP TABLE "_Category_subcategory";

-- DropTable
DROP TABLE "_SubSubcategory_relatedPost";

-- DropTable
DROP TABLE "_Subcategory_subSubcategory";
