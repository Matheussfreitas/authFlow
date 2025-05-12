export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  userId: string;
}

export enum TaskStatus {
  PENDENTE = "PENDENTE",
  CONCLUIDO = "CONCLUIDO"
}

export enum TaskPriority {
  URGENTE = "URGENTE",
  ALTA = "ALTA",
  MEDIA = "MEDIA",
  BAIXA = "BAIXA"
}


