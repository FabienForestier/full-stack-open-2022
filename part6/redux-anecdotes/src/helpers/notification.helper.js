import { hide, notify } from "../reducers/notificationsReducer";
import store from "../store";

export const displayNotification = (message) => {
  store.dispatch(notify(message));
  setTimeout(() => {
    store.dispatch(hide());
  }, 5000)
}