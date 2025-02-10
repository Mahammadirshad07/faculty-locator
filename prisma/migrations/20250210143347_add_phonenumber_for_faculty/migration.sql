/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_phoneNumber_key" ON "Faculty"("phoneNumber");
