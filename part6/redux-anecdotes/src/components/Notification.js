import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    message && <div style={style}>
      {message}
    </div>
  )
}

export default Notification