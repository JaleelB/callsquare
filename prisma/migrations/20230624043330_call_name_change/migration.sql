/*
  Warnings:

  - You are about to drop the column `callId` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `name` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `callName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_callId_fkey`;

-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_userId_fkey`;

-- AlterTable
ALTER TABLE `Call` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `endTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Participant` DROP COLUMN `callId`,
    ADD COLUMN `callName` VARCHAR(191) NOT NULL,
    ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_callName_fkey` FOREIGN KEY (`callName`) REFERENCES `Call`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
