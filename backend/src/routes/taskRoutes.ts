import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const taskRouter = Router();

taskRouter.get("/:userId/tasks", TaskController.getTasksByUserId);
taskRouter.post("/:userId/tasks", TaskController.createTask);
taskRouter.put("/:taskId", TaskController.updateTask);
taskRouter.delete("/:taskId", TaskController.deleteTask);

export default taskRouter;