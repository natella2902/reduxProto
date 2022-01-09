import { createSlice } from "@reduxjs/toolkit";

const initialState = {entities: []}
const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    set(state, action) {
      state.entities.push(action.payload)
    }
   }
})

const { reducer: errorReducer, actions } = errorSlice
const { set } = actions

export const setError = (message) => (dispatch) => {
    dispatch(set(message))
}

export const getErrors = () => (state) => (state.errors.entities[0])

export default errorReducer