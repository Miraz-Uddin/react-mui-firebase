import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk(
  "todo/getAll",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isError: false,
  isLoading: true,
  isSuccess: false,
  message: "",
  todos: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = true;
        state.todos = null;
        state.message = "Pending ..";
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.todos = action.payload;
        state.message = "Success !!";
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.todos = null;
      });
  },
});

export default todoSlice.reducer;
