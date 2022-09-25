const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
}

const Notification = ({ message }) => message ? <div style={successStyle}>{message}</div> : null;

export default Notification;