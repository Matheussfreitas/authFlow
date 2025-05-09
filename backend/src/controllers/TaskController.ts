import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

const taskService = new TaskService();

export class TaskController {
  static async getTasksByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const tasks = await taskService.getTasksByUserId(userId);
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async createTask(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, description, status, priority } = req.body;
    try {
      const task = await taskService.createTask(userId, title, description, status, priority);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;
    const data = req.body;
    try {
      const task = await taskService.updateTask(taskId, data);
      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;
    try {
      const response = await taskService.deleteTask(taskId);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}