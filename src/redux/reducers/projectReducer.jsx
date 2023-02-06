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
    assignUserToProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    assignUserTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    removeUserFromTaskAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    removeUserFromProjectAction: (state, action) => {
      state.projectDetail = action.payload;
    },
    setProjectDetailNullAction: (state, action) => {
      state.projectDetail = action.payload;
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
  assignUserToProjectAction,
  assignUserTaskAction,
  removeUserFromTaskAction,
  removeUserFromProjectAction,
  setProjectDetailNullAction,
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

export const createProjectAuthorizeApi = (project) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/createProjectAuthorize`, project);
    const action = createProjectAuthorizeAction(result.data.content);
    dispatch(action);
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
      `/Project/updateProject?projectId=${projectUpdate.id}`
    );
    const action = updateProjectAction(result.data.content);
    dispatch(action);
  };
};

export const assignUserToProjectApi = (addUser) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/assignUserProject`, addUser);
    const action = assignUserToProjectAction(result.data.content);
    dispatch(action);
  };
};

export const assignUserTaskApi = ({ taskId, userId }) => {
  return async (dispatch) => {
    const result = await http.post(`/Project/assignUserTask`, {
      taskId,
      userId,
    });
    const action = assignUserToProjectAction(result.data.content);
    dispatch(action);
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

export const removeUserFromProjectApi = ({ projectId, userId }) => {
  return async (dispatch) => {
    const result = await http.post("/Project/removeUserFromProject", {
      projectId,
      userId,
    });
    const action = removeUserFromProjectAction(result.data.content);
    dispatch(action);
  };
};
