"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import EditTaskModal from "./editTaskModal"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

type Task = {
  id: string
  text: string
  completed: boolean
  priority: "baixa" | "média" | "alta"
  createdAt: Date
}

export default function TasksList({ filteredTasks, task }: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Recuperar tarefas do localStorage se disponível
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }
  const [editText, setEditText] = useState("")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "destructive"
      case "média":
        return "warning"
      case "baixa":
        return "secondary"
      default:
        return "secondary"
    }
  }
  const saveEdit = (id: string) => {
    if (editText.trim() === "") return

    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)))
    setEditingTask(null)
  }
  return (
    <div className="space-y-2">
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Nenhuma tarefa encontrada. Adicione uma nova tarefa para começar!
          </CardContent>
        </Card>
      ) : (
        filteredTasks.map((task) => (
          <Card key={task.id} className={`transition-all ${task.completed ? "bg-muted/50" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1"
                />
                <div className="flex-grow">
                  {editingTask === task.id ? (
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(task.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                      autoFocus
                    />
                  ) : (
                    <div className="flex flex-col">
                      <p className={`${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.text}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="default" className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  {!task.completed && (
                    <EditTaskModal task={task} />
                  )}
                  {!task.completed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}