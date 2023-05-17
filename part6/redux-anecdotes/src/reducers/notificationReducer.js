import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: undefined},
  reducers: {
    notify(_, { payload: message}) {
      return { message }
    }
  }
});

export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;