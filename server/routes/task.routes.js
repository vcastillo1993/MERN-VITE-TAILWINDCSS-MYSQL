/* DOCUMENTO DONDE SE ESTRABLECEN LAS RUTAS DE TASK */
import { Router } from "express";
import {
  getTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks
} from '../controller/tasks.controllers.js'
const router = Router()

router.get('/tasks', getTasks)

router.get('/task/:id',getTask)

router.post('/tasks', createTasks)

router.put('/tasks/:id', updateTasks )

router.delete('/task/:id', deleteTasks)


export default router