/*
  Warnings:

  - You are about to drop the column `ip_address` on the `user_activity` table. All the data in the column will be lost.
  - Added the required column `anon_ip` to the `user_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `user_activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_activity" DROP COLUMN "ip_address",
ADD COLUMN     "anon_ip" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
