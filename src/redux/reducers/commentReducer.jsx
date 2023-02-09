import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  commentError: null,
  commentList: [],
};

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setCommentErrorAction: (state, action) => {
      state.commentError = action.payload;
    },
    getAllCommentsAction: (state, action) => {
      state.commentList = action.payload;
    },
  },
});

export const {
  setCommentErrorAction,
  getAllCommentsAction,
} = commentReducer.actions;

export default commentReducer.reducer;

export const getAllCommentsApi = (params, callback) => {
  return async (dispatch) => {
    const result = await http.get("/Comment/getAll", { params });
    const action = getAllCommentsAction(result.data.content);
    dispatch(action);
    if (callback) callback();
  };
};

export const insertCommentApi = (insertedData, callback) => {
  return async (dispatch) => {
    await http.post("/Comment/insertComment", insertedData);
    if (callback) callback();
  };
};

export const updateCommentApi = ({ id, contentComment }, callback) => {
  return async (dispatch) => {
    dispatch(setCommentErrorAction(null));
    try {
      await http.put(
        `/Comment/updateComment?id=${id}&contentComment=${contentComment}`
      );
      if (callback) callback();
    } catch (error) {
      if (error.response.data.statusCode === 403) {
        dispatch(setCommentErrorAction(error.response.data.content));
      }
    }
  };
};

export const deleteCommentApi = (idComment, callback) => {
  return async (dispatch) => {
    dispatch(setCommentErrorAction(null));
    try {
      await http.delete(`/Comment/deleteComment?idComment=${idComment}`);
      if (callback) callback();
    } catch (error) {
      if (error.response.data.statusCode === 403) {
        dispatch(setCommentErrorAction(error.response.data.content));
      }
    }
  };
};
