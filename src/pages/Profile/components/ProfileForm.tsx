import React, { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProfileRequest,
  setName,
  editProfileRequest,
} from '../../../store/modules/profile/actions';
import {
  InputStyled,
  ItemStyled,
  Container,
  FormStyled,
  ButtonStyled,
} from './../styles/Profile';
import { LoadingOutlined } from '@ant-design/icons';
import { ProfileContext } from '../Profile';

const ProfileForm: React.FC = () => {
  const { setVisibleUpdatePasswordModal } = useContext(ProfileContext);

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
          <ItemStyled>
            <ButtonStyled
              type="primary"
              htmlType="submit"
              loading={loadingUpdateProfileRequest}
            >
              Salvar
            </ButtonStyled>
          </ItemStyled>
          <ItemStyled>
            <ButtonStyled onClick={() => setVisibleUpdatePasswordModal(true)}>
              Editar Palavra-passe
            </ButtonStyled>
          </ItemStyled>
        </FormStyled>
      )}
    </Container>
  );
};

export default ProfileForm;
