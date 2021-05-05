import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNewPassword,
  setPassword,
  updatePasswordRequest,
} from '../../../../store/modules/profile/actions';
import { ProfileContext } from '../../Profile';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
  Text,
  List,
  ListItem,
} from '../../../../styles/App';

const UpdatePasswordForm: React.FC = () => {
  const { setVisibleUpdatePasswordModal } = useContext(ProfileContext);

  const { password, newPassword, loadingUpdatePasswordRequest } = useSelector(
    (state: any) => state.profile,
  );

  const dispatch = useDispatch();

  const handlePasswordChange = (password: string) => {
    dispatch(setPassword({ password }));
  };

  const handleNewPasswordChange = (newPassword: string) => {
    dispatch(setNewPassword({ newPassword }));
  };

  const handleFinish = () => {
    dispatch(updatePasswordRequest());
  };

  return (
    <>
      <Text>Para proteger sua conta, certifique-se de sua palavra-passe:</Text>
      <List>
        <ListItem>
          <Text>Contém entre 8 e 20 caracteres</Text>
        </ListItem>
        <ListItem>
          <Text>Contém pelo menos 1 letra maiúscula</Text>
        </ListItem>
        <ListItem>
          <Text>Contém pelo menos 1 letra minúscula</Text>
        </ListItem>
        <ListItem>
          <Text>Contém pelo menos 1 número</Text>
        </ListItem>
        <ListItem>
          <Text>Contém pelo menos 1 desses símbolos: $@#%</Text>
        </ListItem>
      </List>
      <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
        <ItemStyled
          label="Palavra-passe atual"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor digite sua palavra-passe!',
            },
          ]}
        >
          <InputStyled.Password
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Digite a nova palavra-passe"
          />
        </ItemStyled>

        <ItemStyled
          label="Nova Palavra-passe"
          name="new_password"
          rules={[
            {
              required: true,
              message: 'Por favor digite sua nova palavra-passe!',
            },
          ]}
        >
          <InputStyled.Password
            value={newPassword}
            onChange={(e) => handleNewPasswordChange(e.target.value)}
            placeholder="Digite a nova palavra-passe"
          />
        </ItemStyled>

        <ItemStyled
          name="confirm"
          label="Confirmar Nova Palavra-passe"
          dependencies={['new_password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confirme sua nova palavra-passe!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'A confirmação e a nova palavra-passe não são iguais!',
                  ),
                );
              },
            }),
          ]}
        >
          <InputStyled.Password placeholder="Confirmar a nova palavra-passe" />
        </ItemStyled>

        <ItemStyled>
          <ButtonStyled
            type="primary"
            htmlType="submit"
            loading={loadingUpdatePasswordRequest}
          >
            Editar Palavra-passe
          </ButtonStyled>
        </ItemStyled>

        <ItemStyled>
          <ButtonStyled
            type="link"
            onClick={() => setVisibleUpdatePasswordModal(false)}
          >
            Cancelar
          </ButtonStyled>
        </ItemStyled>
      </FormStyled>
    </>
  );
};

export default UpdatePasswordForm;
