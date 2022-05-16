import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskApi from "../../api/taskApis";
import { getTaskList } from "./pages/ListPage";

export const getAllTask = createAsyncThunk("/todos", async () => {
  const data = await taskApi.getAll();
  return data;
});

const initialState = [];

const todo = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      taskApi.add(action.payload);
      state.unshift(action.payload);
    },
    removeTask: (state, action) => {
      const removeTodoid = action.payload;
      taskApi.remove(removeTodoid);

      state = state.filter((todo) => todo.id !== removeTodoid);
      return state;
    },
    updateTask: (state, action) => {
      const newTask = action.payload;
      taskApi.update(newTask);
      const todoIndex = state.findIndex((todo) => todo.id === newTask.id);
      if (todoIndex >= 0) {
        state[todoIndex] = newTask;
      }
    },
    ClearData: (state) => {
      return (state = []);
    },
  },
  extraReducers: {
    [getAllTask.fulfilled]: (state, action) => {
      action.payload.forEach((element) => {
        state.push(element);
      });
    },
  },
});

const { reducer, actions } = todo;
export const { addTask, removeTask, updateTask, ClearData } = actions;
export default reducer;
