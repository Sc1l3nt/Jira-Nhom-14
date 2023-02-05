import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { history } from "../../index";

const initialState = {
  userLogin: null,
  userProfile: null,
  userList: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    loginFacebookAction: (state, action) => {
      state.userLogin = action.payload;
    },
    registerAction: (state, action) => {
      state.userProfile = action.payload;
    },
    changeInfoAction: (state, action) => {
      state.userProfile = action.payload;
    },
    getAllUserAction: (state, action) => {
      state.userList = action.payload;
    },
    deleteUserAction: (state, action) => {
      state.userList = action.payload;
    },
    getUserByProjectIdAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  loginAction,
  registerAction,
  changeInfoAction,
  getAllUserAction,
  deleteUserAction,
  getUserByProjectIdAction,
  loginFacebookAction,
} = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await http.post("/Users/signin", userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem("access_token", result.data.content.accessToken);
    //login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const loginFacebookApi = (facebookToken) => {
  return async (dispatch) => {
    const result = await http.post("/Users/facebooklogin", facebookToken);
    const action = loginAction(result.data.content);
    dispatch(action);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem("access_token", result.data.content.accessToken);
    //login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const registerApi = (userRegister) => {
  return async (dispatch) => {
    const result = await http.post("/Users/signup", userRegister);
    const action = registerAction(result.data.content);
    dispatch(action);
  };
};

export const changeInfoApi = (userChangeInfo) => {
  return async (dispatch) => {
    const result = await http.put("/Users/editUser", userChangeInfo);
    const action = changeInfoAction(result.data.content);
    dispatch(action);
  };
};

export const getAllUserApi = () => {
  return async (dispatch) => {
    const result = await http.get("/Users/getUser");
    const action = getAllUserAction(result.data.content);
    dispatch(action);
  };
};

export const deleteUserApi = (userId) => {
  return async (dispatch) => {
    const result = await http.delete(`/Users/deleteUser?id=${userId}`);
    const action = deleteUserAction(result.data.content);
    dispatch(action);
    dispatch(getAllUserApi());
    window.location.reload();
  };
};

export const getUserByProjectIdApi = (projectId) => {
  return async (dispatch) => {
    const result = await http.get(
      `Users/getUserByProjectId?idProject=${projectId}`
    );
    const action = getUserByProjectIdAction(result.data.content);
    dispatch(action);
  };
};
