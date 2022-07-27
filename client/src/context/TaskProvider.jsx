import { useContext, useState } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  deleteTaskRequest,
  createTaskRequest,
  updateTaskReques,
  toggleTaskDoneReques
} from "../api/tasks.api";
import { TaskContext } from "./TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskContextProvider")
  }
  return context
}

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  async function loadTasks() {/* A qui cargamos las tareas al estado  */
    const response = await getTasksRequest()
    
    setTasks(response.data)
  }

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task)
      /* setTasks([...tasks, response.data]) */
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id)
      setTasks(tasks.filter(task => task.id != id))
    } catch (error) {
      console.error('ID no corresponde a ninguna tarea', error);
    }
  }

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.error('ID no resivido', error)
    }
  }

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskReques(id, newFields)
      console.log('valActualizado', response);
    } catch (error) {
      console.error('Task no actualiced', error);
    }
  }

  const toggleTaskDone = async (id) => {
    try {
      /* si el id ha buscar pertence a alguna tarea... taskFone sera true */
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneReques(id, taskFound.done === 0 ? true : false);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      )
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, getTask, loadTasks, createTask, deleteTask, updateTask, toggleTaskDone }}>
      {children}
    </TaskContext.Provider>
  )
}
