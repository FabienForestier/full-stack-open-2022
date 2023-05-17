import { useSelector } from "react-redux"
import Notification from "./Notification"

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)
  return (<div>{notifications.map((message, id) => <Notification key={id} message={message}/>)}</div>)
}

export default Notifications;