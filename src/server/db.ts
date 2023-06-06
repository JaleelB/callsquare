import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

interface Env {
  NODE_ENV?: string;
}

interface GlobalThisWithPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as GlobalThisWithPrisma;
const environment = env as Env;

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      environment.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (environment.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
