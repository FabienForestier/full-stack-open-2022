const genericStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
};
const successStyle = {
    ...genericStyle,
    color: 'green',
};
const errorStyle = {
    ...genericStyle,
    color: 'red',
}


const Notification = ({ notification }) => notification ? <div style={notification.type === 'error' ? errorStyle : successStyle}>{notification.message}</div> : null;

export default Notification;