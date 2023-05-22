import { useDispatch, useSelector } from 'react-redux';
import { displayMessage } from '../store/reducers/notification.reducer';

export const useNotification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  return [
    notification,
    (message, type) => {
      dispatch(displayMessage(message, type));
    }
  ];
};
