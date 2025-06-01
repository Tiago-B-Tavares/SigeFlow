/*
  Warnings:

  - You are about to drop the column `contractNumber` on the `Contract` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `StockMovement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Contract_contractNumber_key";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "contractNumber",
ADD COLUMN     "number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MovementType";

-- CreateIndex
CREATE UNIQUE INDEX "Contract_number_key" ON "Contract"("number");
