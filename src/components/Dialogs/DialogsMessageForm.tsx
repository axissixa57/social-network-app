import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea, createField } from "../common/FormsControls/FormsControls";
import { NewMessageFormValuesType } from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormValuesType,
  string
>;
type PropsType = {};

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newMessageBody"
          placeholder="Enter your message "
          validate={[required, maxLength50]}
          component={Textarea}
        />
        {createField<NewMessageFormValuesKeysType>(
          "newMessageBody",
          "Enter your message",
          [required, maxLength50],
          Textarea
        )}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const DialogsMessageForm = reduxForm<NewMessageFormValuesType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);

export default DialogsMessageForm;
