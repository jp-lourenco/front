import React, { createContext, useState } from 'react';
import ResetPasswordModal from './components/ResetPassword/ResetPasswordModal';
import SignInForm from './components/SignInForm';
import SignUpModal from './components/SignUp/SignUpModal';

export const SignInContext = createContext({
  visibleSignUpModal: false,
  setVisibleSignUpModal: (visibleSignUpModal: boolean) => {},
  visibleResetPasswordModal: false,
  setVisibleResetPasswordModal: (visibleResetPasswordModal: boolean) => {},
});

const SignIn: React.FC = () => {
  const [visibleSignUpModal, setVisibleSignUpModal] = useState(false);
  const [visibleResetPasswordModal, setVisibleResetPasswordModal] = useState(
    false,
  );

  return (
    <SignInContext.Provider
      value={{
        visibleSignUpModal,
        setVisibleSignUpModal,
        visibleResetPasswordModal,
        setVisibleResetPasswordModal,
      }}
    >
      <SignInForm />
      <ResetPasswordModal />
      <SignUpModal />
    </SignInContext.Provider>
  );
};

export default SignIn;
