/*
  Warnings:

  - You are about to drop the column `quantity` on the `StockMovement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentNumber]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentNumber` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "documentNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_documentNumber_key" ON "Supplier"("documentNumber");
