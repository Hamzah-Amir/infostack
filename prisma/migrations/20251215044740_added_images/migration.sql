/*
  Warnings:

  - Added the required column `images` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `images` JSON NOT NULL;
