import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Conexão com o banco de dados (AuthRepository) estabelecida com sucesso!");
  })
  .catch((error: any) => {
    console.error("Erro ao conectar ao banco de dados (AuthRepository):", error.message);
  });

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUserId(id: string): Promise<User | null> {
    return prisma.user.findUnique({ 
      where: { id },
      include: { Task: true }
     });
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: { name, email, password },
    });
  }
}