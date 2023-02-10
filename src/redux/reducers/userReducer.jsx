import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { history } from "../../index";
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from "../../constants";
import axios from "axios";

const initialState = {
  userLogin: JSON.parse(localStorage.getItem(USER_LOGIN)) || null,
  userProfile: null,
  userList: [],
  userByProjectId: null,
  me: null,
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
    getMyInfoAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getMeAction: (state, action) => {
      state.me = action.payload;
    },
  },
});

export const {
  loginAction,
  registerAction,
  changeInfoAction,
  getAllUserAction,
  deleteUserAction,
  loginFacebookAction,
  getMyInfoAction,
  getMeAction,
} = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await http.post("/Users/signin", userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);
    console.log("userReducer", result.data.content);
    localStorage.setItem("user_login", JSON.stringify(result.data.content));
    localStorage.setItem("access_token", result.data.content.accessToken);
    //login successfully, redirect to profile page
    history.push("/profile");
  };
};

export const loginFacebookApi = (facebookToken) => {
  return async (dispatch) => {
    const result = await http.post("/Users/facebooklogin", {
      facebookToken: facebookToken,
    });
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

export const changeInfoApi = (userChangeInfo, callback) => {
  return async (dispatch) => {
    try {
      const result = await http.put("/Users/editUser", userChangeInfo);
      const action = changeInfoAction(result.data.content);
      dispatch(action);
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
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

export const getMyInfoApi = () => {
  return async (dispatch) => {
    //const result = await http.get("/Users/getUser");
    axios({
      url: "https://jiranew.cybersoft.edu.vn/api/Users/getUser",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    })
      .then((result) => {
        const userLoginLocal = JSON.parse(localStorage.getItem(USER_LOGIN));
        const me = result.data.content.find(
          (user) => user.userId === userLoginLocal.userId
        );
        if (!me) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(USER_LOGIN);
          window.location.reload();
          return;
        }
        const action = getMeAction(me);
        dispatch(action);
      })
      .catch((err) => console.log(err));
  };
};
