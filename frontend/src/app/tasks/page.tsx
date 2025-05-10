"use client"

import { useEffect, useState } from "react"
import FilterSession from "./components/filters"
import Header from "./components/header"
import TasksList from "./components/tasksList"
import { Task } from "@/types/Task"
import { parseCookies } from "nookies"
import { getUserByToken } from "@/utils/axios"
import { User } from "@/types/User"

export default function TaskPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[] | []>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  const updateTask = (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) {
      throw new Error("Task not found");
    }
    return taskToUpdate;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const cookies = await parseCookies().authFlowToken;
      console.log(cookies);
      const userInfo = await getUserByToken(cookies);
      console.log("Informações do usuário obtidas: ", userInfo);
      setUser(userInfo);
      setTasks(userInfo.Task);
    };

    fetchUserInfo();
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

      <Header userName={user?.name || ""} />

      <FilterSession tasks={tasks} userId={user?.id} onAddTask={addTask}/>

      <TasksList tasks={tasks} onEditTask={updateTask}/>

    </div>
  )
}
