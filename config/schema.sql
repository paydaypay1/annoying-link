CREATE SCHEMA "public";
CREATE TABLE "user_activity" (
  "id" text PRIMARY KEY,
  "request_url" text NOT NULL,
  "visitAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "anon_ip" text NOT NULL,
  "country" text NOT NULL
);
CREATE UNIQUE INDEX "user_activity_pkey" ON "user_activity" ("id");