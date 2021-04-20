import React, { useContext } from 'react';
import {
  ButtonStyled,
  FormStyled,
  InputStyled,
  ItemStyled,
} from '../../styles/MyEmployees';
import { CreateEmployeeContext } from './CreateEmployeeModal';
import { MyEmployeesContext } from '../../MyEmployees';
import { useDispatch } from 'react-redux';
import {
  setEmail,
  createEmployeeRequest,
} from '../../../../store/modules/employee/actions';

const CreateEmployeeForm: React.FC = () => {
  const { setResult } = useContext(CreateEmployeeContext);

  const { setVisibleCreateModal } = useContext(MyEmployeesContext);

  const dispatch = useDispatch();

  const handleEmailChange = (email: string) => {
    dispatch(setEmail({ email }));
  };

  const handleFinish = () => {
    dispatch(createEmployeeRequest());
    setResult(true);
  };

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
      <ItemStyled
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor digite um email!' },
          {
            type: 'email',
            message: 'Digite um email válido!',
          },
        ]}
      >
        <InputStyled
          value={'email'}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Digite o email"
        />
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Registar
        </ButtonStyled>
      </ItemStyled>
      <ItemStyled>
        <ButtonStyled onClick={handleCancel}>Cancelar</ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default CreateEmployeeForm;
