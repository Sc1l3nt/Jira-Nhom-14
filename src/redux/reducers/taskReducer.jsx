import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  taskId: {
    id: "",
    name: "",
  },
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
    getTaskDetailAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    setTaskErrorAction: (state, action) => {
      state.taskError = action.payload;
    },
    getTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

export const {
  getAllTaskTypesAction,
  getTaskDetailAction,
  setTaskErrorAction,
  getTaskId,
} = taskReducer.actions;

export default taskReducer.reducer;

export const getAllTaskTypesApi = () => {
  return async (dispatch) => {
    const result = await http.get(`/TaskType/getAll`);
    const action = getAllTaskTypesAction(result.data.content);
    dispatch(action);
  };
};

export const updateTaskStatusApi = ({ taskId, statusId }, callback) => {
  return async (dispatch) => {
    await http.put(`/Project/updateStatus`, {
      taskId,
      statusId,
    });
    if (callback) callback();
  };
};

export const getTaskDetailApi = (taskId, callback) => {
  return async (dispatch) => {
    const result = await http.get(`/Project/getTaskDetail?taskId=${taskId}`);
    const action = getTaskDetailAction(result.data.content);
    dispatch(action);
    if (callback) callback();
  };
};

export const createTaskApi = (data, callback) => {
  return async (dispatch) => {
    await http.post(`/Project/createTask`, data);
    if (callback) callback();
  };
};

export const updateTaskApi = (data, callback) => {
  return async (dispatch) => {
    await http.post(`/Project/updateTask`, data);
    if (callback) callback();
  };
};

export const updateDescriptionApi = ({ taskId, description }, callback) => {
  return async (dispatch) => {
    await http.put(`/Project/updateDescription`, {
      taskId,
      description,
    });
    if (callback) callback();
  };
};

export const updatePriorityApi = (updatedData, callback) => {
  return async (dispatch) => {
    await http.put(`/Project/updatePriority`, updatedData);
    if (callback) callback();
  };
};

export const updateStatusApi = (data, callback) => {
  return async (dispatch) => {
    await http.put(`/Project/updateStatus`, data);
    if (callback) callback();
  };
};

export const assignUserToTaskApi = ({ taskId, userId }, callback) => {
  return async (dispatch) => {
    await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
    if (callback) callback();
  };
};

export const removeUserFromTaskApi = ({ taskId, userId }, callback) => {
  return async (dispatch) => {
    try {
      await http.post(`/Project/removeUserFromTask`, {
        taskId,
        userId,
      });
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEstimateApi = ({ taskId, originalEstimate }, callback) => {
  return async (dispatch) => {
    try {
      await http.put(`/Project/updateEstimate`, {
        taskId,
        originalEstimate,
      });
      if (callback) callback();
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTimeTrackingApi = (
  { taskId, timeTrackingSpent, timeTrackingRemaining },
  callback
) => {
  return async (dispatch) => {
    try {
      await http.put(`/Project/updateTimeTracking`, {
        taskId,
        timeTrackingSpent,
        timeTrackingRemaining,
      });
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeTaskApi = (taskId, callback) => {
  return async (dispatch) => {
    try {
      await http.delete(`/Project/removeTask?taskId=${taskId}`);
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTaskFormApi = (data, callback) => {
  return async (dispatch) => {
    try {
      await http.post(`/Project/createTask`, data);
      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};
