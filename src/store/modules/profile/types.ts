export interface ProfileState {
  loadingGetMyProfileRequest: boolean;
  name: string;
  email: string;
  password: string;
  newPassword: string;
  error: boolean;
  loadingUpdateProfileRequest: boolean;
}

export interface Profile {
  _id: string;
  name: string;
  email: string;
}
