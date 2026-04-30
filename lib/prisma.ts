import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: process.env.NODE_ENV === "development" ? [] : [] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper: parse JSON array string from SQLite (e.g. courses, topCompanies, examAccepted)
export function parseArrayField(val: unknown): string[] {
  if (Array.isArray(val)) return val as string[];
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(",").map((s) => s.trim()); }
  }
  return [];
}

// Normalise a raw DB college row so array fields are always JS arrays
export function normaliseCollege(c: Record<string, unknown>) {
  return {
    ...c,
    courses:      parseArrayField(c.courses),
    topCompanies: parseArrayField(c.topCompanies),
    examAccepted: parseArrayField(c.examAccepted),
  };
}
