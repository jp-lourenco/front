import { LoadingOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProfileRequest,
  setName,
  setNewPassword,
  setPassword,
  editProfileRequest,
} from '../../store/modules/profile/actions';
import {
  InputStyled,
  ItemStyled,
  Container,
  FormStyled,
  ButtonStyled,
} from './styles/Profile';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const {
    name,
    email,
    loadingGetMyProfileRequest,
    loadingUpdateProfileRequest,
  } = useSelector((state: any) => state.profile);

  useEffect(() => {
    dispatch(getMyProfileRequest());
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      email: email,
      name: name,
    });
  }, [email, name]);

  const [form] = Form.useForm();

  const handleName = (name: string) => {
    dispatch(setName({ name }));
  };

  const handlePassword = (password: string) => {
    dispatch(setPassword({ password }));
  };

  const handleNewPassword = (newPassword: string) => {
    dispatch(setNewPassword({ newPassword }));
  };

  const handleFinish = () => {
    dispatch(editProfileRequest());
  };

  return (
    <Container>
      {loadingGetMyProfileRequest ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <FormStyled
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleFinish}
        >
          <ItemStyled label="Email" name="email">
            <InputStyled
              value={email}
              placeholder="Digite o seu email"
              disabled
            />
          </ItemStyled>
          <ItemStyled
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor coloque seu nome!' }]}
          >
            <InputStyled
              value={name}
              onChange={(e) => handleName(e.target.value)}
              placeholder="Digite o seu nome"
            />
          </ItemStyled>

          <ItemStyled
            label="Palavra-passe"
            name="senha"
            rules={[
              {
                required: true,
                message: 'Por favor coloque sua palavra-passe!',
              },
            ]}
          >
            <InputStyled.Password
              value={'password'}
              onChange={(e) => handlePassword(e.target.value)}
              placeholder="Digite a palavra-passe"
            />
          </ItemStyled>
          <ItemStyled label="Nova palavra-passe" name="nova-senha">
            <InputStyled.Password
              value={'password'}
              onChange={(e) => handleNewPassword(e.target.value)}
              placeholder="Digite a palavra-passe"
            />
          </ItemStyled>
          <ItemStyled>
            <ButtonStyled
              type="primary"
              htmlType="submit"
              loading={loadingUpdateProfileRequest}
            >
              Editar
            </ButtonStyled>
          </ItemStyled>
        </FormStyled>
      )}
    </Container>
  );
};

export default Profile;
