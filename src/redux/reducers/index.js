import { combineReducers } from "redux";
import userReducer from './userReducer';
import todoReducer from './todoReducer';
// import reducer from './reducer';

const reducers = combineReducers({
    userReducer: userReducer,
    todoReducer: todoReducer
});

// const reducers = combineReducers({
//     reducer: reducer
// });

export default reducers;