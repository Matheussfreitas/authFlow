import { PrismaClient } from "@prisma/client";
import { Task } from "../types/Task";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Conexão com o banco de dados (TaskRepository) estabelecida com sucesso!");
  })
  .catch((error: any) => {
    console.error("Erro ao conectar ao banco de dados (TaskRepository):", error.message);
  });

export class TaskRepository {
  async findTaskByUserId(userId: string): Promise<Task[] | null> {
    return prisma.task.findMany({
      where : { userId },
    });
  }

  async createTask(userId: string, title: string, description: string, status: string, priority: string): Promise<Task> {
    return prisma.task.create({
      data: { userId, title, description, status, priority },
    });
  }

  async updateTask(taskId: string, data: Partial<Omit<Task, "id" | "userId">>): Promise<Task> {
    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    return prisma.task.delete({
      where: { id: taskId },
    });
  }

}