import { PrismaClient, Task, TaskPriority, TaskStatus } from "@prisma/client";

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

  async createTask(userId: string, title: string, description: string, status: TaskStatus, priority: TaskPriority, dueDate: Date): Promise<Task> {
    return prisma.task.create({
      data: { userId, title, description, status, priority, dueDate },
    });
  }

  async updateTask(taskId: string, data: Partial<Omit<Task, "id" | "userId">>): Promise<Task> {
    const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    console.error(`Tarefa com ID ${taskId} não encontrada no banco de dados.`);
    throw new Error("Tarefa não encontrada.");
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
}

  async deleteTask(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: { id: taskId },
    });
  }

}