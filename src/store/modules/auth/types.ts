export interface AuthState {
  loadingSignInRequest: boolean;
  loadingSignUpRequest: boolean;
  loadingForgotPasswordRequest: boolean;
  loadingVerifyCodeRequest: boolean;
  loadingChangePasswordRequest: boolean;
  messageSignUp: string;
  signUpError: boolean;
  signInError: boolean;
  forgotPasswordError: boolean;
  verifyCodeError: boolean;
  changePasswordError: boolean;
  email: string;
  emailForgotPassword: string;
  stepForgotPassword: string;
  code: string;
  newPassword: string;
  resultChangePassword: boolean;
  emailCompany: string;
  password: string;
  companyName: string;
  companyFunction: string;
  token: string;
  isSignedIn: boolean;
}
