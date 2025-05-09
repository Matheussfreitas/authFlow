import { TaskRepository } from './../repositories/TaskRepository';
import { Task } from "../types/Task";

const taskRepository = new TaskRepository();

export class TaskService {
  async getTasksByUserId(userId: string) {
    const tasks = await taskRepository.findTaskByUserId(userId);
    if (!tasks) {
      throw new Error("Nenhuma tarefa encontrada para este usuario");
    }
    return tasks;
  }

  async createTask(userId: string, title: string, description: string, status: string, priority: string) {
    const task = await taskRepository.createTask(userId, title, description, status, priority);
    return task;
  }

  async updateTask(taskId: string, data: Partial<Omit<Task, "id" | "userId">>) {
    const task = await taskRepository.updateTask(taskId, data);
    return task;
  }

  async deleteTask(taskId: string) {
    await taskRepository.deleteTask(taskId);
    return { message: "Tarefa deletada com sucesso!" };
  }
}
