"use client"

import { useEffect, useState } from "react"
import FilterSession from "./components/filters"
import Header from "./components/header"
import TasksList from "./components/tasksList"
import { Task } from "@/types/Task"


export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>()

  const [statusFilter, setStatusFilter] = useState<"todas" | "concluídas" | "pendentes">("todas")
  const [priorityFilter, setPriorityFilter] = useState<"todas" | "baixa" | "média" | "alta">("todas")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

      <Header />

      {/* <FilterSession  /> */}

      <TasksList />

    </div>
  )
}
