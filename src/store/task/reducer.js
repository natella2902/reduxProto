import { taskUpdated, taskDeleted } from "./actionTypes";

export function taskReducer(state, action) {
      switch (action.type) {
        case taskUpdated:
            let newArray  = [...state]
            const elIndex = newArray.findIndex((el) => el.id === action.payload.id)
            newArray[elIndex] = { ...newArray[elIndex], ...action.payload}
            return newArray
        case taskDeleted:
            let newArray2  = [...state]
            newArray2 = newArray2.filter((el) => el.id !== action.payload.id)
            return newArray2
        default:
          return state
      }
}