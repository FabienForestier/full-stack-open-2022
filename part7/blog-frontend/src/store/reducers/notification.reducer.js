import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(_, { payload }) {
      return payload;
    }
  }
});

const { setNotification } = notificationSlice.actions;

export const displayMessage = (messageToDisplay, type) => {
  return (dispatch) => {
    dispatch(setNotification({ message: messageToDisplay, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export default notificationSlice.reducer;
