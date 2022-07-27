/* coneccion ha MYSQL */
import { createPool } from "mysql2/promise";
/* los pool tiene uunos metodos "Querys que son los que se utilizar para conectar ha mysql" */
export const pool = new createPool({
  host: 'localhost',
  port: 3305,
  user: 'root',
  password:'root',
  database: 'taskdb'
})


