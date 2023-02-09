import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/config";

const initialState = {
  statusTypes: [],
};

const statusReducer = createSlice({
  name: "statusReducer",
  initialState,
  reducers: {
    getAllStatusTypesAction: (state, action) => {
      state.statusTypes = action.payload;
    },
  },
});

export const { getAllStatusTypesAction } = statusReducer.actions;

export default statusReducer.reducer;

export const getAllStatusTypesApi = () => {
  return async (dispatch) => {
    const result = await http.get(`/Status/getAll`);
    const action = getAllStatusTypesAction(result.data.content);
    dispatch(action);
  };
};
