import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from "react-redux";
import * as actions from "./store/task";
import createStore from "./store/store";
import { getErrors } from "./store/errors";
import { taskChanged, taskDeleted, getLoadingTasks, getTasksIsLoading, getTasks } from "./store/task";

const store = createStore();

const App = (params) => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksIsLoading())
    const error = useSelector(getErrors())
    const dispatch = useDispatch()
    useEffect(() => {
       store.dispatch(getLoadingTasks())
    }, [])
    const taskCompleted = (taskId) => {
       dispatch(actions.taskCompleted(taskId))
    }
    if(error) {
        return <p>{ error[0] }</p>
    }
    if(isLoading) {
        return <h2>Loading...</h2>
    }

    return <>
        <h2>App</h2>
        <ul>
            {state.map((el) => <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={() => taskCompleted(el.id)} >Change completed</button>
                <button onClick={() => dispatch(taskChanged(el.id))} >Change title</button>
                <button onClick={() => dispatch(taskDeleted(el.id))} >Delete</button>
                <hr/>
            </li>)}
        </ul>
    </>
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

