import { PrismaClient } from "@prisma/client";
import { User } from "../types/User";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error: any) => {
    console.error("Erro ao conectar ao banco de dados:", error.message);
  });

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