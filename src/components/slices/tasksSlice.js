import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: ''
}

const base_url = "http://localhost:5000/tasks";
//GET operation:
export const getTasksFromServer = createAsyncThunk(base_url,
    async (_, { rejectWithValue }) => {
        const response = await fetch("http://localhost:5000/tasks")
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({ error: 'No tasks found' })
        }
    }
)

//POST operation:
export const addTasksToServer = createAsyncThunk("tasks/addTasksToServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }
        const response = await fetch(base_url, options)
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({ error: 'Task not added' })
        }
    }
)

//PATCH operation:
export const updateTaskInServer = createAsyncThunk("tasks/updateTaskInServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }
        const response = await fetch(base_url + '/' + task.id, options)
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({ error: 'Task not updated' })
        }
    }
)

//DELETE operation:
export const deleteTaskFromServer = createAsyncThunk("tasks/deleteTaskFromServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'DELETE'

        }
        const response = await fetch(base_url + '/' + task.id, options)
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({ error: 'Task not deleted' })
        }
    }
)

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {

        removeTaskFromList: (state, action) => {
            state.tasksList = state.tasksList.filter((a) => {
                return a.id !== action.payload.id;
            })
        },
        updateTaskInList: (state, action) => {
            state.tasksList = state.tasksList.map((a) => {
                return a.id === action.payload.id ? action.payload : a
            })
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        }
    },
    extraReducers: (builder) => {
        //GET operation:
        builder.addCase(getTasksFromServer.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getTasksFromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList = action.payload;

            })
            .addCase(getTasksFromServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
                state.tasksList = [];
            })

            //POST operation:
            .addCase(addTasksToServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTasksToServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList.push(action.payload)
            })
            .addCase(addTasksToServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            //Patch operation:
            .addCase(updateTaskInServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTaskInServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })

            .addCase(updateTaskInServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            //Delete operation:
            .addCase(deleteTaskFromServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTaskFromServer.fulfilled, (state) => {
                state.isLoading = false;
                state.error = '';
                
            })

            .addCase(deleteTaskFromServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })
    }
})

export const { removeTaskFromList, updateTaskInList, setSelectedTask } = tasksSlice.actions

export default tasksSlice.reducer
