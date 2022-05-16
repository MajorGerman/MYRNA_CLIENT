import React from 'react';
import './Notification.css';

function Notification(props) {
    
    function closeNotify () {
        props.setNotify(false);
    }

    return (
        <div className='notificationPage'>
            <div onClick={closeNotify} className='notification'>
                <p> {props.notifyText} </p>
            </div>           
        </div>
    )
}

export default Notification;