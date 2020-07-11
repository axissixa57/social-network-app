import React from "react";

import object from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import DialogsMessageForm from "./DialogsMessageForm";
import { InitialStateType } from "../../redux/reducers/dialogs";

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} id={d.id} name={d.name} />
  ));
  const messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  const addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={object.dialogs}>
      <div className={object.dialogItems}>{dialogsElements}</div>
      <div className={object.messages}>
        <div>{messagesElements}</div>
        <DialogsMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
