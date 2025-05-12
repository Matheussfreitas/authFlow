"use client"

import { useEffect, useState } from "react"
import FilterSession from "./components/filters"
import Header from "./components/header"
import TasksList from "./components/tasksList"
import { Task, TaskPriority, TaskStatus } from "@/types/Task"
import { parseCookies } from "nookies"
import { deleteTask, getUserByToken, updateTask } from "@/utils/axios"
import { User } from "@/types/User"

export default function TaskPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<"todas" | "concluídas" | "pendentes">("todas");
  const [priorityFilter, setPriorityFilter] = useState<"todas" | "baixa" | "média" | "alta" | "urgente">("todas");

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  const handleTaskComplete = async (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) return;

    const updatedTask = {
      ...taskToUpdate,
      status:
        taskToUpdate.status === TaskStatus.PENDENTE
          ? TaskStatus.CONCLUIDO
          : TaskStatus.PENDENTE,
    };

    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      console.log("Tarefa atualizada com sucesso:", response);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    console.log("Tarefa atualizada recebida: ", updatedTask);

    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      console.log("Resposta da API: ", response);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      return response;
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const trash = await deleteTask(taskId);
      console.log("Resposta da API: ", trash);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log(`Tarefa com ID ${taskId} removida com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "todas" ||
      (statusFilter === "concluídas" && task.status === TaskStatus.CONCLUIDO) ||
      (statusFilter === "pendentes" && task.status === TaskStatus.PENDENTE);

    const matchesPriority =
      priorityFilter === "todas" ||
      (priorityFilter === "urgente" && task.priority === TaskPriority.URGENTE) ||
      (priorityFilter === "alta" && task.priority === TaskPriority.ALTA) ||
      (priorityFilter === "média" && task.priority === TaskPriority.MEDIA) ||
      (priorityFilter === "baixa" && task.priority === TaskPriority.BAIXA);

    return matchesStatus && matchesPriority;
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await parseCookies().authFlowToken;
      console.log("Token: ", token);
      const userInfo = await getUserByToken(token);
      console.log("Informações do usuário obtidas: ", userInfo);
      setUser(userInfo);
      setTasks(userInfo.Task);
    };

    fetchUserInfo();
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <Header userName={user?.name || ""} />

      <FilterSession
        tasks={tasks}
        userId={user?.id}
        onAddTask={addTask}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <TasksList
        tasks={filteredTasks}
        onEditTask={handleUpdateTask}
        onCompleteTask={handleTaskComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
