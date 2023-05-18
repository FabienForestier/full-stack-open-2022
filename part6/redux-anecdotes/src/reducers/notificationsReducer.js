import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, { payload: message}) {
      state.push(message);
    },
    hide(state) {
      state.shift();
    }
  }
});

export const { showNotification, hide } = notificationsSlice.actions;
export const notify = (message, time) => {
  return dispatch => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(hide())
    }, time * 1000)
  }
}
export default notificationsSlice.reducer;