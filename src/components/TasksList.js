import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';

function TasksList() {
    function UpdateTask(){
        console.log("update");
        setModalShow(true)
    }
    function DeleteTask(){
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
             <Button variant="primary" className='mx-3' onClick={()=>UpdateTask()}><i className="bi bi-pencil-square"></i></Button>
             <Button variant="primary" onClick={()=>DeleteTask()}><i className="bi bi-trash3-fill"></i></Button>
          </td>
        </tr>
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