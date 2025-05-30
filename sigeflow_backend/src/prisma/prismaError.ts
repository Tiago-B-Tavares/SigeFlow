import { Prisma } from "@prisma/client";

const { PrismaClientKnownRequestError } = Prisma;
export class PrismaError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "PrismaError";
  }
}