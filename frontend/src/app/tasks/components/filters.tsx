"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/types/Task"
import { Filter } from "lucide-react"
import CreateTaskModal from "./createTaskModal"

interface FilterSessionProps {
  tasks: Task[];
  userId: string | undefined;
  onAddTask: (task: Task) => void;
  statusFilter: "todas" | "concluídas" | "pendentes";
  setStatusFilter: (value: "todas" | "concluídas" | "pendentes") => void;
  priorityFilter: "todas" | "baixa" | "média" | "alta" | "urgente";
  setPriorityFilter: (value: "todas" | "baixa" | "média" | "alta" | "urgente") => void;
}

export default function FilterSession({
  tasks,
  userId,
  onAddTask,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: FilterSessionProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <h2 className="text-xl font-semibold">
        {tasks.length} {tasks.length === 1 ? "Tarefa" : "Tarefas"}
      </h2>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={statusFilter}
              onValueChange={(value: string) => setStatusFilter(value as "todas" | "concluídas" | "pendentes")}
            >
              <DropdownMenuRadioItem value="todas">Todas</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pendentes">Pendentes</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="concluídas">Concluídas</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Prioridade
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={priorityFilter}
              onValueChange={(value: string) => setPriorityFilter(value as "todas" | "baixa" | "média" | "alta" | "urgente")}
            >
              <DropdownMenuRadioItem value="todas">Todas</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="baixa">Baixa</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="média">Média</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="alta">Alta</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="urgente">Urgente</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateTaskModal userId={userId} onTaskAdd={onAddTask} />
      </div>
    </div>
  )
}