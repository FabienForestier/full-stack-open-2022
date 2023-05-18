import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) =>  {
  switch(action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return undefined
    default:
      return state;
  }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, undefined);

  return <NotificationContext.Provider value={[notification, notificationDispatch]}>
    {props.children}
  </NotificationContext.Provider>
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useDisplayNotification = () => {
  const notificationDispatch = useNotificationDispatch();
  return (message) => {
    notificationDispatch({ type: 'SHOW', payload: message});
    setTimeout(() => { notificationDispatch({ type: 'HIDE'})}, 5000);
  }
}

export default NotificationContext;