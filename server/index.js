import express from 'express'
import cors from 'cors'
import {dirname, join} from "path"
import { fileURLToPath } from "url";
import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/task.routes.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname);

/* cors es una libreria que permite ensalzar el front-end con el back-end, 
tambien se puede especificar que puertos pueden y no conectarse al backent */
app.use(cors())
/* Funcion para procesar los datos json que vienen del cliente */
app.use(express.json())
/* usando las rutas de operacin  */
app.use(indexRoutes)
app.use(taskRoutes)

app.use(express.static(join(__dirname, '../client/dist'))) /* Enlazando Back-End con Front-End */

/* trayendo la direccion del puerto para iniciarlo */
app.listen(PORT)
console.log(`server on pot ${PORT}`);