import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageBody' placeholder='Enter your message ' validate={[required, maxLength50]} component={Textarea}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const DialogsMessageForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default DialogsMessageForm;