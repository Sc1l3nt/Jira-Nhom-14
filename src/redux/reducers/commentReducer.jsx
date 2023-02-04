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
    insertCommentAction: (state, action) => {
      state.commentList.push(action.payload);
    },
    updateCommentAction: (state, action) => {
      state.commentList = action.payload;
    },
    deleteCommentAction: (state, action) => {
      state.commentList = action.payload;
    },
  },
});

export const {
  setCommentErrorAction,
  getAllCommentsAction,
  insertCommentAction,
  updateCommentAction,
  deleteCommentAction,
} = commentReducer.actions;

export default commentReducer.reducer;

export const getAllCommentsApi = (params) => {
  return async (dispatch) => {
    const result = await http.get("/Comment/getAll", { params });
    const action = getAllCommentsAction(result.data.content);
    dispatch(action);
  };
};

export const insertCommentApi = ({ taskId, contentComment }) => {
  return async (dispatch) => {
    const result = await http.post("/Comment/insertComment", {
      taskId,
      contentComment,
    });
    const action = insertCommentAction(result.data.content);
    dispatch(action);
  };
};

export const updateCommentApi = ({ id, contentComment }) => {
  return async (dispatch) => {
    const result = await http.put(
      `/Comment/updateComment?id=${id}&contentComment=${contentComment}`
    );
    const action = updateCommentAction(result.data.content);
    dispatch(action);
  };
};

export const deleteCommentApi = (idComment) => {
  return async (dispatch) => {
    const result = await http.delete(
      `/Comment/deleteComment?idComment=${idComment}`
    );
    const action = deleteCommentAction(result.data.content);
    dispatch(action);
  };
};
