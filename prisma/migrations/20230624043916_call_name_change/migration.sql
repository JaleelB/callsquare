/*
  Warnings:

  - Added the required column `callId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_callName_fkey`;

-- AlterTable
ALTER TABLE `Participant` ADD COLUMN `callId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `Call`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
