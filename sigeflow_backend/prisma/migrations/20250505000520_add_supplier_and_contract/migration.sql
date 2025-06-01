/*
  Warnings:

  - You are about to drop the column `minimumStock` on the `Supply` table. All the data in the column will be lost.
  - Added the required column `contractNumber` to the `Supply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minStock` to the `Supply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierName` to the `Supply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supply" DROP COLUMN "minimumStock",
ADD COLUMN     "contractNumber" TEXT NOT NULL,
ADD COLUMN     "minStock" INTEGER NOT NULL,
ADD COLUMN     "supplierName" TEXT NOT NULL;
