import { PrismaClient } from "@prisma/client";

declare global {
  var __seijakuPrisma__: PrismaClient | undefined;
}

export const prisma =
  global.__seijakuPrisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__seijakuPrisma__ = prisma;
}
