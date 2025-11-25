-- CreateTable
CREATE TABLE "Investor" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "nodes" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Investor_walletAddress_key" ON "Investor"("walletAddress");
