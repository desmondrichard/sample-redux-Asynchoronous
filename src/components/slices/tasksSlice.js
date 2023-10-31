import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: ''
}


export const getTasksFromServer = createAsyncThunk("tasks/getTasksFromServer",
async(_,{rejectWithValue})=>{
    const response=await fetch("http://localhost:8000/tasks")
    if(response.ok){
        const jsonResponse=await response.json();
        return jsonResponse;
    }else{
        return rejectWithValue({error:'No tasks found'})
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
    extraReducers:(builder)=>{
        builder.addCase(getTasksFromServer.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getTasksFromServer.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error='';
            state.tasksList=action.payload;

        })
        .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload.error;
            state.tasksList=[];
        })
    }
})

export const {  removeTaskFromList, updateTaskInList, setSelectedTask } = tasksSlice.actions

export default tasksSlice.reducer