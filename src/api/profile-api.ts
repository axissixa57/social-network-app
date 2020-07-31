import { instance, APIResponseType, SavePhotoResponseDataType } from "./api";
import { ProfileType } from "../types/types";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(res => res.data);
  },
  updateStatus(status: string) {
    // отправляем на сервер (req.body) - объект
    return instance.put<APIResponseType>(`profile/status/`, { status: status }).then(res => res.data);
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(res => res.data);
  },
};