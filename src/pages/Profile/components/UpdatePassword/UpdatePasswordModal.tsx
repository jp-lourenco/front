import React, { useContext, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ProfileContext } from '../../Profile';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdatePasswordResult from './UpdatePasswordResult';

export const UpdatePasswordContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const UpdatePasswordModal: React.FC = () => {
  const {
    visibleUpdatePasswordModal,
    setVisibleUpdatePasswordModal,
  } = useContext(ProfileContext);

  const [result, setResult] = useState(false);

  const { loadingUpdatePasswordRequest, resultUpdatePassword } = useSelector(
    (state: any) => state.profile,
  );

  return (
    <UpdatePasswordContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleUpdatePasswordModal}
        title={`Editar Palavra-passe`}
        onOk={() => setVisibleUpdatePasswordModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <UpdatePasswordForm />
        ) : (
          [
            loadingUpdatePasswordRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <UpdatePasswordResult />
            ),
          ]
        )}
      </Modal>
    </UpdatePasswordContext.Provider>
  );
};

export default UpdatePasswordModal;
