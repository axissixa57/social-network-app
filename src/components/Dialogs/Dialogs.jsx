import React from 'react';

import object from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    return (
        <div className={object.dialogs}>
            <div className={object.dialogItems}>
                <DialogItem name='Yauheni' id='1'/>
            </div>
            <div className={object.messages}>
                <Message message='Hello, how are you?'/>
            </div>
        </div>
    )
}

export default Dialogs;