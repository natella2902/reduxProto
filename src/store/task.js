import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors"

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    update(state, action) {
       const elIndex = state.entities.findIndex((el) => el.id === action.payload.id)
       state.entities[elIndex] = { ...state.entities[elIndex], ...action.payload}
    },
    remove(state, action) {
       state.entities = state.entities.filter(
          (el) => el.id !== action.payload.id
       );
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    taskRequested(state, action) {
        state.isLoading = false
    },
    taskRequestFailed(state, action) {
        state.isLoading = true
    }
  }
})

const { reducer: taskReducer, actions } = taskSlice
const { update, remove, received, taskRequested, taskRequestFailed } = actions

export function taskCompleted(id) {
    return update({id, completed: true})
}

export const taskDeleted = (id) => (getState, dispatch) => {
    dispatch(remove({id}))
}

export const taskChanged = (id) => (getState, dispatch) => {
    dispatch(update({id, title: `New title for ${id}`}))
}

// const taskRequested = createAction("task/requested")
// const taskRequestFailed = createAction("task/requestFailed")

export const getLoadingTasks = () => async (getState, dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksIsLoading = () => (state) => state.tasks.isLoading

export default taskReducer;