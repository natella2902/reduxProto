import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "./store/createStore";
import { taskReducer } from "./store/taskReducer";
import * as actions from "./store/actions";

const initialState = [{ id: 1, title: "Task 1", completed: false }, { id: 2, title: "Task 2", completed: false }]
const store = createStore(taskReducer, initialState);

const App = (params) => {
    const [state, setState] = useState(store.getState());

    useEffect(() => { store.subscribe(() => { setState(store.getState()) })}, [])
    const taskCompleted = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId))
    }
    const taskChanged = (taskId) => {
        store.dispatch(actions.taskChanged(taskId))
    }
    const taskDeleted = (taskId) => {
        store.dispatch(actions.taskDeleted(taskId))
    }
    return <>
        <h2>App</h2>
        <ul>
            {state.map((el) => <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={() => taskCompleted(el.id)} >Change completed</button>
                <button onClick={() => taskChanged(el.id)} >Change title</button>
                <button onClick={() => taskDeleted(el.id)} >Delete</button>
                <hr/>
            </li>)}
        </ul>
    </>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

