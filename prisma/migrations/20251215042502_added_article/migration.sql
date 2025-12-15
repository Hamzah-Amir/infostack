/*
  Warnings:

  - You are about to drop the column `raw_data` on the `content` table. All the data in the column will be lost.
  - Added the required column `article` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` DROP COLUMN `raw_data`,
    ADD COLUMN `article` TEXT NOT NULL;
