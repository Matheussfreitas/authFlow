import { TaskStatus, TaskPriority } from '@prisma/client';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  userId: string;
}
