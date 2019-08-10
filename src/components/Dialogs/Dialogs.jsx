import React from 'react';

import object from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    const state = props.dialogsPage;

    const dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    const messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>);
    const newMessageBody = state.newMessageBody;

    const onSendMessageClick = () => {
        props.sendMessage();
    }

    const onNewMessageChange = (e) => {
        const body = e.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={object.dialogs}>
            <div className={object.dialogItems}>
                {dialogsElements}
            </div>
            <div className={object.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder='Enter your message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;