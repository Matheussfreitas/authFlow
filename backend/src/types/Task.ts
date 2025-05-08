export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

enum TaskStatus {
  PENDENTE,
  CONCLUIDO
}

enum TaskPriority {
  URGENTE,
  ALTA,
  MEDIA,
  BAIXA
}


