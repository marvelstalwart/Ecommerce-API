/*
  Warnings:

  - You are about to drop the column `artisanId` on the `ShoppingCart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ShoppingCart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ShoppingCart" DROP CONSTRAINT "ShoppingCart_artisanId_fkey";

-- DropIndex
DROP INDEX "public"."ShoppingCart_artisanId_key";

-- AlterTable
ALTER TABLE "ShoppingCart" DROP COLUMN "artisanId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_userId_key" ON "ShoppingCart"("userId");

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
