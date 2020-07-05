import axios, { AxiosResponse } from "axios";
import { UserType, PhotosType } from "../types/types";

export const instance = axios.create({
  // `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "101b805d-f8a4-4d2d-8813-46ece1a1ecb1",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCapctha {
  CaptchaIsRequired = 10,
}

export type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseDataType = {
  userId: number;
};

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  // generic-у можно также задавать значение по умолчанию
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

export type SavePhotoResponseDataType = {
  photos: PhotosType;
};
