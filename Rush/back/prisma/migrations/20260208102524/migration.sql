/*
  Warnings:

  - Changed the type of `label` on the `ImageCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ImageCard" DROP COLUMN "label",
ADD COLUMN     "label" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Label";
