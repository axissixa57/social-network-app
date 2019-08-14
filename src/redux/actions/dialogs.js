export const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});