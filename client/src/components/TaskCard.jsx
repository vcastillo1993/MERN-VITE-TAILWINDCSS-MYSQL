import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskProvider'

const TaskCard = ({ task }) => {
  const { deleteTask, toggleTaskDone } = useTasks()
  const navigate = useNavigate()

  const handleDone = async () => {
    await toggleTaskDone(task.id)
  }

  return (
    <div className='bg-zinc-700 text-white rounded-md p-4'>
      <header className='flex justify-between'>
        <h2 className='text-sm font-bold'>{task.title}</h2>
        <span> {task.done == 1 ? "✔️" : "❌"}</span>
      </header>
      <p className='text-xs'>{task.description}</p>
      <span>{task.createAt}</span>
      <div className='flex gap-x-1'>
        <button className='text-black bg-red-300 px-2 py-1' onClick={() => deleteTask(task.id)}>Delete</button>
        <button className='text-black bg-slate-300 px-2 py-1' onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className='text-black bg-green-300 px-2 py-1' onClick={() => handleDone(task.done)}>Toggle Task</button>
      </div>
    </div>
  )
}

export default TaskCard