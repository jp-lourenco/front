export function signInRequest() {
  return {
    type: '@auth/SIGN_IN_REQUEST',
  };
}

export function signInSuccess({ token }: { token: string }) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
    },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function logoutRequest() {
  return {
    type: '@auth/LOGOUT_REQUEST',
  };
}

export function signUpRequest() {
  return {
    type: '@auth/SIGN_UP_REQUEST',
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}

export function signUpFailure({ message }: { message: string }) {
  return {
    type: '@auth/SIGN_UP_FAILURE',
    payload: { message },
  };
}

export function forgotPasswordRequest() {
  return {
    type: '@auth/FORGET_PASSWORD_REQUEST',
  };
}

export function forgotPasswordSuccess() {
  return {
    type: '@auth/FORGET_PASSWORD_SUCCESS',
  };
}

export function forgotPasswordFailure() {
  return {
    type: '@auth/FORGET_PASSWORD_FAILURE',
  };
}

export function verifyCodeRequest() {
  return {
    type: '@auth/VERIFY_CODE_REQUEST',
  };
}

export function verifyCodeSuccess() {
  return {
    type: '@auth/VERIFY_CODE_SUCCESS',
  };
}

export function verifyCodeFailure() {
  return {
    type: '@auth/VERIFY_CODE_FAILURE',
  };
}

export function changePasswordRequest() {
  return {
    type: '@auth/CHANGE_PASSWORD_REQUEST',
  };
}

export function changePasswordSuccess() {
  return {
    type: '@auth/CHANGE_PASSWORD_SUCCESS',
  };
}

export function changePasswordFailure() {
  return {
    type: '@auth/CHANGE_PASSWORD_FAILURE',
  };
}

export function setEmail({ email }: { email: string }) {
  return {
    type: '@auth/SET_EMAIL',
    payload: { email },
  };
}

export function setEmailForgotPassword({
  emailForgotPassword,
}: {
  emailForgotPassword: string;
}) {
  return {
    type: '@auth/SET_EMAIL_FORGET_PASSWORD',
    payload: { emailForgotPassword },
  };
}

export function setCodeForgotPassword({
  codeForgotPassword,
}: {
  codeForgotPassword: string;
}) {
  return {
    type: '@auth/SET_CODE_FORGET_PASSWORD',
    payload: { codeForgotPassword },
  };
}

export function setNewPassword({ newPassword }: { newPassword: string }) {
  return {
    type: '@auth/SET_NEW_PASSWORD',
    payload: { newPassword },
  };
}

export function resetResultChangePassword() {
  return {
    type: '@auth/RESET_RESULT_CHANGE_PASSWORD',
  };
}

export function setStepForgotPassword({ step }: { step: string }) {
  return {
    type: '@auth/SET_STEP_FORGOT_PASSWORD',
    payload: { step },
  };
}

export function setEmailCompany({ emailCompany }: { emailCompany: string }) {
  return {
    type: '@auth/SET_EMAIL_COMPANY',
    payload: { emailCompany },
  };
}

export function setCompanyName({ companyName }: { companyName: string }) {
  return {
    type: '@auth/SET_COMPANY_NAME',
    payload: { companyName },
  };
}

export function setCompanyFunction({
  companyFunction,
}: {
  companyFunction: string;
}) {
  return {
    type: '@auth/SET_COMPANY_FUNCTION',
    payload: { companyFunction },
  };
}

export function setPassword({ password }: { password: string }) {
  return {
    type: '@auth/SET_PASSWORD',
    payload: { password },
  };
}
