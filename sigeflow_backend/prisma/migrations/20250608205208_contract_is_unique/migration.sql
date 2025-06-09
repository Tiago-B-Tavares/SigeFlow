/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contract_number_key" ON "Contract"("number");
