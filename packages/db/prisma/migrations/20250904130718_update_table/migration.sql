-- CreateEnum
CREATE TYPE "public"."P2PTransferStatus" AS ENUM ('Pending', 'Success', 'Failed');

-- AlterTable
ALTER TABLE "public"."p2pTransfer" ADD COLUMN     "status" "public"."P2PTransferStatus" NOT NULL DEFAULT 'Pending',
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;
