import React, { createContext, useState } from 'react';
import ProfileForm from './components/ProfileForm';
import UpdatePasswordModal from './components/UpdatePassword/UpdatePasswordModal';

export const ProfileContext = createContext({
  visibleUpdatePasswordModal: false,
  setVisibleUpdatePasswordModal: (visibleUpdatePasswordModal: boolean) => {},
});

const Profile: React.FC = () => {
  const [visibleUpdatePasswordModal, setVisibleUpdatePasswordModal] = useState(
    false,
  );

  return (
    <ProfileContext.Provider
      value={{
        visibleUpdatePasswordModal,
        setVisibleUpdatePasswordModal,
      }}
    >
      <ProfileForm />
      <UpdatePasswordModal />
    </ProfileContext.Provider>
  );
};

export default Profile;
