import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./reducers/commentReducer";
import priorityReducer from "./reducers/priorityReducer";
import projectReducer from "./reducers/projectReducer";
import statusReducer from "./reducers/statusReducer";
import taskReducer from "./reducers/taskReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    commentReducer: commentReducer,
    projectReducer: projectReducer,
    taskReducer: taskReducer,
    userReducer: userReducer,
    priorityReducer: priorityReducer,
    statusReducer: statusReducer,
  },
});
