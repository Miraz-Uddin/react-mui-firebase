import { combineReducers } from "redux";
import counterSlice from "../features/counter/counterSlice";
import todoSlice from "../features/todo/todoSlice";

const rootReducer = combineReducers({
  counter: counterSlice,
  todo: todoSlice,
});

export default rootReducer;
