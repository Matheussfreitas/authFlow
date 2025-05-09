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

export enum TaskStatus {
  PENDENTE,
  CONCLUIDO
}

export enum TaskPriority {
  URGENTE,
  ALTA,
  MEDIA,
  BAIXA
}


