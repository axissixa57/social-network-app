import { InferActionsTypes } from "../store";

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({
      type: "SEND_MESSAGE",
      newMessageBody,
    } as const),
};
