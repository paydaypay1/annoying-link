import { PrismaClient } from "../src/generated/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaPg } from "@prisma/adapter-pg"

var adapter;

if (process.env.ENVIRONMENT === "production") {
  adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    connectionLimit: 5,
  });
} else {
  adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
}

export default function prisma(){
  return new PrismaClient({ adapter });
}