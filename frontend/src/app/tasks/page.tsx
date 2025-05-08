"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Definição do tipo de tarefa
type Task = {
  id: string
  text: string
  completed: boolean
  priority: "baixa" | "média" | "alta"
  createdAt: Date
}

// Componente principal
export default function TaskPanel() {
  // Estados
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Recuperar tarefas do localStorage se disponível
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  const [newTaskText, setNewTaskText] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<"baixa" | "média" | "alta">("média")
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [statusFilter, setStatusFilter] = useState<"todas" | "concluídas" | "pendentes">("todas")
  const [priorityFilter, setPriorityFilter] = useState<"todas" | "baixa" | "média" | "alta">("todas")

  // Salvar tarefas no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Adicionar nova tarefa
  const addTask = () => {
    if (newTaskText.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date(),
    }

    setTasks([...tasks, newTask])
    setNewTaskText("")
  }

  // Alternar status de conclusão
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Remover tarefa
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Iniciar edição
  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setEditText(task.text)
  }

  // Salvar edição
  const saveEdit = (id: string) => {
    if (editText.trim() === "") return

    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)))
    setEditingTask(null)
  }

  // Filtrar tarefas
  const filteredTasks = tasks
    .filter((task) => {
      if (statusFilter === "todas") return true
      if (statusFilter === "concluídas") return task.completed
      return !task.completed
    })
    .filter((task) => {
      if (priorityFilter === "todas") return true
      return task.priority === priorityFilter
    })
    // Ordenar por prioridade (alta -> média -> baixa)
    .sort((a, b) => {
      const priorityOrder = { alta: 3, média: 2, baixa: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

  // Obter cor da prioridade
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Cabeçalho */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
          Painel de Tarefas
        </h1>
        <p className="text-muted-foreground">Organize suas tarefas de forma eficiente</p>
      </header>

      {/* Formulário para adicionar tarefas */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Adicionar nova tarefa..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-grow"
            />
            <Select
              value={newTaskPriority}
              onValueChange={(value: "baixa" | "média" | "alta") => setNewTaskPriority(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="média">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Barra de filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold">
          {filteredTasks.length} {filteredTasks.length === 1 ? "Tarefa" : "Tarefas"}
        </h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(value: "todas" | "concluídas" | "pendentes") => setStatusFilter(value)}
              >
                <DropdownMenuRadioItem value="todas">Todas</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pendentes">Pendentes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="concluídas">Concluídas</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Prioridade
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={priorityFilter}
                onValueChange={(value: "todas" | "baixa" | "média" | "alta") => setPriorityFilter(value)}
              >
                <DropdownMenuRadioItem value="todas">Todas</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="baixa">Baixa</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="média">Média</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="alta">Alta</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Lista de tarefas */}
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
                          <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {!task.completed && (
                      <Button variant="ghost" size="icon" onClick={() => startEditing(task)} className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    )}
                    {!task.completed && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTask(task.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
