"use client"

import { useEffect, useState } from "react"
import FilterSession from "./components/filters"
import Header from "./components/header"
import TasksList from "./components/tasksList"

// Definição do tipo de tarefa
type Task = {
  id: string
  text: string
  completed: boolean
  priority: "baixa" | "média" | "alta"
  createdAt: Date
}

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

  const [statusFilter, setStatusFilter] = useState<"todas" | "concluídas" | "pendentes">("todas")
  const [priorityFilter, setPriorityFilter] = useState<"todas" | "baixa" | "média" | "alta">("todas")

  // Salvar tarefas no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

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
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      
      <Header />

      <FilterSession  />
  
      <TasksList  />
      
      {/* Formulário para adicionar tarefas */}
      {/* <Card className="mb-6">
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
      </Card> */}


      {/* Lista de tarefas */}
      {/* <div className="space-y-2">
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
                        <span className="">Editar</span>
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
      </div> */}
    </div>
  )
}
