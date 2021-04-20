export interface AuthState {
  loadingSignInRequest: boolean;
  loadingSignUpRequest: boolean;
  loadingResetPasswordRequest: boolean;
  messageResetPassword: string;
  messageSignUp: string;
  signUpError: boolean;
  signInError: boolean;
  resetPasswordError: boolean;
  email: string;
  emailResetPassword: string;
  emailCompany: string;
  password: string;
  companyName: string;
  companyFunction: string;
  token: string;
  isSignedIn: boolean;
}
