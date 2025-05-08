import { PrismaClient } from "@prisma/client";
import { User } from "../types/User";

const prisma = new PrismaClient();

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: { name, email, password },
    });
  }
}