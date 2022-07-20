import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "./features/counter/counterSlice";
import { getAllTodos } from "./features/todo/todoSlice";

function App() {
  const count = useSelector((state) => state.counter);
  const todos = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <>
      <p> {count.value} </p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment By 5
      </button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </>
  );
}

export default App;
