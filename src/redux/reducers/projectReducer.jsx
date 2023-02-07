import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  projectList: [],
  projectCategories: [],
  projectMembers: [],
  projectDetail: null,
  projectError: null,
  statusTask: null,
  taskType: null,
  priority: null,
  createTask: null,
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
    deleteProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
    searchProjectAction: (state, action) => {
      state.projectList = action.payload;
    },
    getAllProjectCategoryAction: (state, action) => {
      state.projectCategories = action.payload;
    },
    createProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    createProjectAuthorizeAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    getProjectDetailAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    updateProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    assignUserTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    removeUserFromTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    setProjectDetailNullAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    setProjectErrorNullAction: (state, action) => {
      state.projectError = action.payload;
    },
    getUsersByProjectIdAction: (state, action) => {
      state.projectMembers = action.payload;
    },
  },
});

export const {
  getAllProjectAction,
  deleteProjectAction,
  searchProjectAction,
  getAllProjectCategoryAction,
  createProjectAction,
  createProjectAuthorizeAction,
  getProjectDetailAction,
  updateProjectAction,
  assignUserTaskAction,
  removeUserFromTaskAction,
  setProjectDetailNullAction,
  setProjectErrorNullAction,
  getUsersByProjectIdAction,
} = projectReducer.actions;

export default projectReducer.reducer;

export const getAllProjectApi = (params) => {
  return async (dispatch) => {
    const result = await http.get(`/Project/getAllProject`, { params });
    const action = getAllProjectAction(result.data.content);
    dispatch(action);
  };
};

export const deleteProjectApi = (projectId) => {
  return async (dispatch) => {
    const result = await http.delete(
      `/Project/deleteProject?projectId=${projectId}`
    );
    const action = deleteProjectAction(result.data.content);
    dispatch(action);
    window.location.reload();
  };
};

export const searchProjectApi = (keyword) => {
  return async (dispatch) => {
    const result = await http.get(`/Project/getAllProject?keyword=${keyword}`);
    const action = getAllProjectAction(result.data.content);
    dispatch(action);
  };
};

export const getAllProjectCategoryApi = () => {
  return async (dispatch) => {
    const result = await http.get(`/ProjectCategory`);
    const action = getAllProjectCategoryAction(result.data.content);
    dispatch(action);
  };
};

export const createProjectAuthorizeApi = (project, callback) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/createProjectAuthorize`, project);
    const action = createProjectAuthorizeAction(result.data.content);
    dispatch(action);
    if (callback) {
      callback();
    }
  };
};

export const getProjectDetailApi = (projectId) => {
  return async (dispatch) => {
    const result = await http.get(`/Project/getProjectDetail?id=${projectId}`);
    const action = getProjectDetailAction(result.data.content);
    dispatch(action);
  };
};

export const updateProjectApi = (projectUpdate) => {
  return async (dispatch) => {
    const result = await http.put(
      `/Project/updateProject?projectId=${projectUpdate.id}`,
      projectUpdate
    );
    const action = updateProjectAction(result.data.content);
    dispatch(action);
    window.location.reload();
  };
};

export const assignUserToProjectApi = (addUser, callback) => {
  return async (dispatch) => {
    try {
      http.post(`/Project/assignUserProject`, addUser);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 403) {
        dispatch(setProjectErrorNullAction(error.response.data.content));
      }
    }
  };
};

export const assignUserTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
  };
};

export const removeUserFromTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    const result = await http.post("/Project/removeUserFromTask", {
      taskId,
      userId,
    });
    const action = removeUserFromTaskAction(result.data.content);
    dispatch(action);
  };
};

export const removeUserFromProjectApi = (data, callback) => {
  return async (dispatch) => {
    dispatch(setProjectErrorNullAction(null));
    try {
      await http.post("/Project/removeUserFromProject", data);
      if (callback) callback();
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 403) {
        dispatch(setProjectErrorNullAction(error.response.data.content));
      }
    }
  };
};

export const getUsersByProjectIdApi = (projectId) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/Users/getUserByProjectId?idProject=${projectId}`
      );
      console.log(result.data.content);
      const action = getUsersByProjectIdAction(result.data.content);
      dispatch(action);
    } catch (error) {
      const action = getUsersByProjectIdAction(null);
      dispatch(action);
    }
  };
};
