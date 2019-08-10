import React from 'react';
import {connect} from "react-redux";

import Dialogs from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/actions/dialogs";

// как бы срабатывает обращение к store.getState() в state
const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreator(body)),
        sendMessage: () => dispatch(sendMessageCreator()),
    };
};

// connect сам засунет в первый параметр state, а во 2-ой dispatch
// также connect оптимизирует отрисовку, например, если нет изменений, он его не отрисует
// проверяет значения в ключах у объекта, кот. вернёт mapStateToProps, если изменелись - перерисовать, нет - не рисовать
const DialogsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialogs);

export default DialogsContainer;