import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./reducers/commentReducer";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    commentReducer: commentReducer,
    projectReducer: projectReducer,
    taskReducer: taskReducer,
    userReducer: userReducer,
  },
});
