import React from 'react'
import { useSelector } from 'react-redux'


function Navbar() {
  const {tasksList,error}=useSelector((state)=>state.tasks)
  return (
    <div>
        <h2 className="fw-bolder text-center text-primary mt-3 mb-1">Project Management</h2>
        <h4 className="text-center lead">{`Currently ${tasksList.length} tasks pending`}</h4>
        {
          (error!==''?<h5 className='text-center text-danger'>{error}</h5>:null)
        }
    </div>
  )
}

export default Navbar