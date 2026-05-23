-- CreateTable
CREATE TABLE "user_activity" (
    "id" TEXT NOT NULL,
    "request_url" TEXT NOT NULL,
    "visitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT NOT NULL,

    CONSTRAINT "user_activity_pkey" PRIMARY KEY ("id")
);
