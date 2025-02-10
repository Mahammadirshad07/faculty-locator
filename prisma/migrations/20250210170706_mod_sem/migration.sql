/*
  Warnings:

  - You are about to drop the column `semester` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "semester" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "semester";
