import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, { payload: message}) {
      state.push(message);
    },
    hide(state) {
      state.shift();
    }
  }
});

export const { notify, hide } = notificationsSlice.actions;
export default notificationsSlice.reducer;