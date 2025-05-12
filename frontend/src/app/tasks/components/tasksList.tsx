"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Task, TaskPriority, TaskStatus } from "@/types/Task"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"
import EditTaskModal from "./editTaskModal"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => Task;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TasksList({ tasks, onEditTask, onCompleteTask, onDeleteTask }: TaskListProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateRemainingDays = (dueDate: Date | string) => {
    const currentDate = new Date();
    const due = new Date(dueDate);
    const differenceInTime = due.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case TaskStatus.CONCLUIDO:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENTE:
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case TaskPriority.ALTA:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case TaskPriority.MEDIA:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case TaskPriority.BAIXA:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleCompleteTask = (taskId: string) => {
    onCompleteTask(taskId);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      toast.success(
        `Tarefa "${task.title}" marcada como ${task.status === TaskStatus.PENDENTE ? "concluída" : "pendente"}!`
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task?.status === TaskStatus.CONCLUIDO) {
      toast.error("Tarefas concluídas não podem ser apagadas!");
      return;
    }
    onDeleteTask(taskId);
    if (task) {
      toast.success(`Tarefa "${task.title}" foi removida com sucesso!`);
    }
  };

  const handleEditTask = (updatedTask: Task) => {
    onEditTask(updatedTask);
    toast.success(`Tarefa "${updatedTask.title}" foi atualizada com sucesso!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {tasks.map((task) => (
        <Card key={task.id} className="w-full max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.status === TaskStatus.CONCLUIDO}
                  onCheckedChange={() => handleCompleteTask(task.id)}
                  className="h-4 w-4 cursor-pointer"
                />
                <div className="flex items-center gap-2 justify-between flex-1">
                  <Tooltip>
                    <TooltipTrigger>
                      <CardTitle
                        className={`text-lg font-semibold text-left line-clamp-2 ${
                          task.status === TaskStatus.CONCLUIDO ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.title}
                      </CardTitle>
                    </TooltipTrigger>
                    <TooltipContent className="text-left">{task.title}</TooltipContent>
                  </Tooltip>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => {
                      setTaskBeingEdited(task);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <Badge variant="default" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full hover:bg-red-100 ${
                    task.status === TaskStatus.CONCLUIDO ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={task.status === TaskStatus.CONCLUIDO}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remover tarefa</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 gap-2 mb-4 line-clamp-3">{task.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar className="h-4 w-4" />
              <span>Vencimento: {formatDate(new Date(task.dueDate))}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Prioridade:</p>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">{calculateRemainingDays(task.dueDate)} dias</span>
            </div>
          </CardFooter>
        </Card>
      ))}

      {taskBeingEdited && (
        <EditTaskModal
          task={taskBeingEdited}
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setTaskBeingEdited(null);
          }}
          onSave={(updatedTask) => {
            handleEditTask(updatedTask);
            setIsEditDialogOpen(false);
            setTaskBeingEdited(null);
          }}
        />
      )}
    </div>
  );
}