import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
///
import { addTasksToServer } from './slices/tasksSlice';
///
import { useDispatch } from 'react-redux';

function AddTask() {
    ///
    const dispatch=useDispatch();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    function Add(e) {
        e.preventDefault();
        console.log({ title, desc });
        dispatch(addTasksToServer({title,desc}))
        setTitle('');
        setDesc('');
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3 text-start" controlId="title1">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="desc1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" placeholder="enter task description" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </Form.Group>
                <div className="text-end">
                    <Button variant="outline-success" onClick={(e) => Add(e)}>Add Task</Button>
                </div>

            </Form>
        </div>
    )
}

export default AddTask