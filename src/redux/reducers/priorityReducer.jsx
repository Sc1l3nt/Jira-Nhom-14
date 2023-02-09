import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  priority: [],
};

const priorityReducer = createSlice({
  name: "priorityReducer",
  initialState,
  reducers: {
    getAllPriorityAction: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { getAllPriorityAction } = priorityReducer.actions;

export default priorityReducer.reducer;

export const getAllPriorityApi = () => {
  return async (dispatch) => {
    const result = await http.get(`/Priority/getAll`);
    const action = getAllPriorityAction(result.data.content);
    dispatch(action);
  };
};
