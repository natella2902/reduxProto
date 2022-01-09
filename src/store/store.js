// import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./task";
import errorReducer from "./errors";
import { logger } from "./middleware/logger";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "./middleware/thunk";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

const middlewareEnhancer = applyMiddleware(logger, thunk);

function configStore() {
    return createStore(rootReducer, compose(middlewareEnhancer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
}
export default configStore;

// function createStore() {
//     return configureStore({
//         reducer: rootReducer,
//         middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//         devTools: process.env.NODE_ENV !== 'production'
//     })
// }
//
// export default createStore
