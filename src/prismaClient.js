import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Add connection pooling for better performance
  log: ["query", "info", "warn", "error"],
});

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
