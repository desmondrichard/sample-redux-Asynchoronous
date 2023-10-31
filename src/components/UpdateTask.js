import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
///
import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";
import { updateTaskInServer } from './slices/tasksSlice';

function MyVerticallyCenteredModal(props) {
    ///
    const { selectedTask } = useSelector((state) => state.tasks);
    ///
    const dispatch=useDispatch();

    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    ///
    const [id,setId]=useState(0);

    const UpdateTask=()=>{
        props.onHide();
        dispatch(updateTaskInServer({id,title,desc}))
    }

    ///
    useEffect(() => {
        if (Object.keys(selectedTask).length !== 0) {
          setTitle(selectedTask.title);
          setDesc(selectedTask.desc);
          setId(selectedTask.id);
        }
      }, [selectedTask]);
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='lead'>
                        Update Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group className="mb-3 text-start" controlId="title2">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" placeholder="enter title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="desc2">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" placeholder="enter task description" rows={3} value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                </Form.Group>
                
                
            </Form>
                </Modal.Body>
                <Modal.Footer>
                <div className="text-end">
                    <Button variant="outline-success" onClick={(e)=>UpdateTask(e)}>Update</Button>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyVerticallyCenteredModal