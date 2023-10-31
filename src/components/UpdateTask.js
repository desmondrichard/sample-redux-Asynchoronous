import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function MyVerticallyCenteredModal(props) {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");

    const UpdateTask=()=>{
        props.onHide()
    }
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