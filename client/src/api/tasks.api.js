import axios from 'axios'

export const getTasksRequest = async () =>
  await axios.get('http://localhost:3304/tasks')

export const createTaskRequest = async (task) =>
  await axios.post('http://localhost:3304/tasks', task)

export const deleteTaskRequest = async (id) =>
  await axios.delete(`http://localhost:3304/task/${id}`)

export const getTaskRequest = async(id) =>
  await axios.get(`http://localhost:3304/task/${id}`)

export const updateTaskReques = async (id, newFields)=>
  await axios.put(`http://localhost:3304/tasks/${id}`,newFields)

export const toggleTaskDoneReques = async(id, done) =>
  await axios.put(`http://localhost:3304/tasks/${id}`,{done})