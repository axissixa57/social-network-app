import React from 'react';
import {connect} from "react-redux";

import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/actions/dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// hoc
const AuthRedirectComponent = withAuthRedirect(Dialogs);

// как бы срабатывает обращение к store.getState() в state
const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreator(body)),
        sendMessage: () => dispatch(sendMessageCreator()),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);