-- AlterTable
ALTER TABLE `issues` ADD COLUMN `assigneeToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issues` ADD CONSTRAINT `Issues_assigneeToUserId_fkey` FOREIGN KEY (`assigneeToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
