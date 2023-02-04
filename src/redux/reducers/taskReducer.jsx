import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  taskTypes: [],
  taskDetail: null,
  taskError: null,
};

const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    getAllTaskTypesAction: (state, action) => {
      state.taskTypes = action.payload;
    },
    updateTaskStatusAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    getTaskDetailAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    createTaskAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    updateTaskAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    updateDescriptionAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    updatePriorityAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    assignUserToTaskAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    removeUserFromTaskAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    updateEstimateAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    updateTimeTrackingAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    removeTaskAction: (state, action) => {
      state.taskDetail = action.payload;
    },
  },
});

export const {
  getAllTaskTypesAction,
  updateTaskStatusAction,
  getTaskDetailAction,
  createTaskAction,
  updateTaskAction,
  updateDescriptionAction,
  updatePriorityAction,
  assignUserToTaskAction,
  removeUserFromTaskAction,
  updateEstimateAction,
  updateTimeTrackingAction,
  removeTaskAction,
} = taskReducer.actions;

export default taskReducer.reducer;

export const getAllTaskTypesApi = () => {
  return async (dispatch) => {
    const result = await http.get(`/TaskType/getAll`);
    const action = getAllTaskTypesAction(result.data.content);
    dispatch(action);
  };
};

export const updateTaskStatusApi = ({ taskId, statusId }) => {
  return async (dispatch) => {
    const result = await http.put(`/Project/updateStatus`, {
      taskId,
      statusId,
    });
    const action = updateTaskStatusAction(result.data.content);
    dispatch(action);
  };
};

export const getTaskDetailApi = (taskId) => {};

export const createTaskApi = (data) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/createTask`, data);
    const action = createTaskAction(result.data.content);
    dispatch(action);
  };
};

export const updateTaskApi = (data) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/updateTask`, data);
    const action = updateTaskAction(result.data.content);
    dispatch(action);
  };
};

export const updateDescriptionApi = ({ taskId, description }) => {
  return async (dispatch) => {
    const result = await http.put(`/Project/updateDescription`, {
      taskId,
      description,
    });
    const action = updateDescriptionAction(result.data.content);
    dispatch(action);
  };
};

export const updatePriorityApi = ({ taskId, priorityId }) => {
  return async (dispatch) => {
    const result = await http.put(`/Project/updateStatus`, {
      taskId,
      priorityId,
    });
    const action = updatePriorityAction(result.data.content);
    dispatch(action);
  };
};

export const assignUserToTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
    const action = assignUserToTaskAction(result.data.content);
    dispatch(action);
  };
};

export const removeUserFromTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/removeUserFromTask`, {
      taskId,
      userId,
    });
    const action = removeUserFromTaskAction(result.data.content);
    dispatch(action);
  };
};

export const updateEstimateApi = ({ taskId, originalEstimate }) => {
  return async (dispatch) => {
    const result = await http.put(`/Project/updateEstimate`, {
      taskId,
      originalEstimate,
    });
    const action = updateEstimateAction(result.data.content);
    dispatch(action);
  };
};

export const updateTimeTrackingApi = ({
  taskId,
  timeTrackingSpent,
  timeTrackingRemaining,
}) => {
  return async (dispatch) => {
    const result = await http.put(`/Project/updateTimeTracking`, {
      taskId,
      timeTrackingSpent,
      timeTrackingRemaining,
    });
    const action = updateTimeTrackingAction(result.data.content);
    dispatch(action);
  };
};

export const removeTaskApi = (taskId) => {
  return async (dispatch) => {
    const result = await http.delete(`/Project/removeTask?taskId=${taskId}`);
    const action = removeTaskAction(result.data.content);
    dispatch(action);
  };
};
