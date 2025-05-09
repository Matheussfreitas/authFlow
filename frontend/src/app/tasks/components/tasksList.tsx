"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskPriority, TaskStatus } from "@/types/Task"
import { Calendar, Clock } from "lucide-react"

export default function TasksList() {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

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

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2">Terminar rotas de autenticação</CardTitle>
            <Badge variant="default">Pendente</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 gap-2 mb-4 line-clamp-3">Descricão da tarefa</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4" />
            <span>Vencimento: {formatDate(new Date("2023-01-01"))}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Prioridade:</p>
            <Badge variant="outline" className="text-xs">Urgente</Badge>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">3 dias</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}