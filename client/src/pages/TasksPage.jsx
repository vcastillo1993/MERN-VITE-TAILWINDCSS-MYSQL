import React from 'react'
import { useEffect } from "react";
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskProvider';

const TasksPage = () => {

  const {tasks, loadTasks} = useTasks()
  
  useEffect(() => {
    loadTasks()
  }, [])

  function rendermain(){
    if (tasks.length === 0) {return <h1>No tasks yet</h1>}
     
    return tasks.map((task) => <TaskCard task={task} key={task.id}/>)
  }

  return (
    <div className='text-1xl text-black font-bold text-center'>
      <h1 className='text-white'>Tasks</h1>
      <div className='grid grid-cols-3 gap-2'>
        {rendermain()}
      </div>
    </div>
  )
}

export default TasksPage