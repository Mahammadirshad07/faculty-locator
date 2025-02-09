-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_facultyId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "facultyId" DROP NOT NULL,
ALTER COLUMN "facultyId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
