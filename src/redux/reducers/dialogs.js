import {SEND_MESSAGE} from "../actions/dialogs";

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
};

const dialogs = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            const body = action.newMessageBody;
            // делаем копию того, что будем менять
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            };
        }
        default:
            return state;
    }
}

export default dialogs