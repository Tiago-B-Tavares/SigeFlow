/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Contract_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "Contract_id_key" ON "Contract"("id");
