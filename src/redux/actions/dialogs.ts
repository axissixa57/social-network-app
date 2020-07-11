import { InferActionsTypes } from "../store";

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: "SEND_MESSAGE",
      newMessageBody,
    } as const),
};
