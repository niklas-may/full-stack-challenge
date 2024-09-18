import { PrismaClient } from "@prisma/client";

export function mockPrisma() {
  return {
    user: {
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
    },
  } as unknown as PrismaClient;
}
