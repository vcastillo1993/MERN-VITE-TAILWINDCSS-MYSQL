import React from 'react'
import { Formik, Form } from 'formik'
import { useTasks } from '../context/TaskProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const TaskForm = () => {

  const { createTask, getTask, updateTask } = useTasks()
  const [task, setTask] = useState({ title: "", description: "" })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id)
        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask()

  }, [])

  return (
    <div className='mx-auto'>
      <Formik
        initialValues={task}
        enableReinitialize={true}/* funcion de formik para reniciar el estado cada que se actualise la tarea */
        onSubmit={async (values, actions) => {

          if (params.id) {
            await updateTask(params.id, values)
            navigate("/")
            console.log('modificado');
          } else {
            await createTask(values)
            navigate("/")
          }
          setTask({ title: "", description: "" })
          actions.resetForm()/* metodo de formk para limpiar campos del formulario vasandose en el estado inicial estableciado*/
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (/* El handleChange es una funcion que llena el estado del FORMIT */
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-20">
            <h1 className='text-xl font-bold uppercase text-center'>{params.id ? "EDIT TASK" : "NEW TASK"}</h1>
            <label >title</label>
            <input
              type="text"
              name='title'
              className='px-2 py-1 rounded-sm w-full'
              placeholder='Write a title'
              onChange={handleChange}
              value={values.title}
            />

            <label className='block'>description</label>
            <textarea
              name="description"
              className='px-2 py-1 rounded-sm w-full'
              rows="3"
              placeholder='Write a description'
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button 
            className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md' 
            type='submit' 
            disabled={isSubmitting}
            >{isSubmitting ? "saving" : "save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm