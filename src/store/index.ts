import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todo',
  initialState: [ 'Make coffee', 'Study Redux', 'Study Zustand'],
  reducers: {},
})


export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  }
})