import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import { getTasksFromServer } from './slices/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
///
import { setSelectedTask} from "./slices/tasksSlice";
function TasksList() {
  ///
  const dispatch = useDispatch();
  ///
  const { tasksList } = useSelector((state) => state.tasks)

  function UpdateTask(task) {
    console.log("update");
    setModalShow(true);
    ////
    dispatch(setSelectedTask(task))
  }

  ///
  useEffect(() => {
    dispatch(getTasksFromServer())
  }, [dispatch])

  function DeleteTask() {
    console.log("delete");
  }

  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*  */}
          {
            tasksList && tasksList.map((task, index) => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.desc}</td>
                  <td>
                    <Button variant="primary" className='mx-3' onClick={() => UpdateTask(task)}><i className="bi bi-pencil-square"></i></Button>
                    <Button variant="primary" onClick={() => DeleteTask()}><i className="bi bi-trash3-fill"></i></Button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}


export default TasksList