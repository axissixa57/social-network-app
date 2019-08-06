import React from 'react';

import object from '../Dialogs.module.css';

const Message = (props) => {
    return <div className={object.message}>{props.message}</div>
}

export default Message;