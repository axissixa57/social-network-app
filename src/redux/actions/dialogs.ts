export const SEND_MESSAGE = "SEND_MESSAGE";

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});
