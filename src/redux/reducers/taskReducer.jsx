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
    getTaskDetailAction: (state, action) => {
      state.taskDetail = action.payload;
    },
    setTaskErrorAction: (state, action) => {
      state.taskError = action.payload;
    },
  },
});

export const {
  getAllTaskTypesAction,
  getTaskDetailAction,
  setTaskErrorAction,
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
    await http.put(`/Project/updateStatus`, {
      taskId,
      statusId,
    });
  };
};

export const getTaskDetailApi = (taskId) => {};

export const createTaskApi = (data) => {
  return async (dispatch) => {
    await http.post(`/Project/createTask`, data);
  };
};

export const updateTaskApi = (data) => {
  return async (dispatch) => {
    await http.post(`/Project/updateTask`, data);
  };
};

export const updateDescriptionApi = ({ taskId, description }) => {
  return async (dispatch) => {
    await http.put(`/Project/updateDescription`, {
      taskId,
      description,
    });
  };
};

export const updatePriorityApi = ({ taskId, priorityId }) => {
  return async (dispatch) => {
    await http.put(`/Project/updateStatus`, {
      taskId,
      priorityId,
    });
  };
};

export const assignUserToTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
  };
};

export const removeUserFromTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    try {
      await http.post(`/Project/removeUserFromTask`, {
        taskId,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEstimateApi = ({ taskId, originalEstimate }) => {
  return async (dispatch) => {
    try {
      await http.put(`/Project/updateEstimate`, {
        taskId,
        originalEstimate,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTimeTrackingApi = ({
  taskId,
  timeTrackingSpent,
  timeTrackingRemaining,
}) => {
  return async (dispatch) => {
    try {
      await http.put(`/Project/updateTimeTracking`, {
        taskId,
        timeTrackingSpent,
        timeTrackingRemaining,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeTaskApi = (taskId) => {
  return async (dispatch) => {
    try {
      await http.delete(`/Project/removeTask?taskId=${taskId}`);
    } catch (error) {
      console.log(error);
    }
  };
};
