import React, { useContext } from 'react';
import {
  ButtonStyled,
  SelectStyled,
  FormStyled,
  ItemStyled,
} from '../../../../styles/App';
import { EditEmployeeContext } from './EditEmployeeModal';
import { MyEmployeesContext } from '../../MyEmployees';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRoleEdit,
  editEmployeeRequest,
} from '../../../../store/modules/employee/actions';
import { Select } from 'antd';

const roles = ['Gerente', 'Funcionário'];

const EditEmployeeForm: React.FC = () => {
  const { setResult } = useContext(EditEmployeeContext);

  const { employeeIdSelected, setVisibleEditModal } = useContext(
    MyEmployeesContext,
  );

  const { role } = useSelector((state: any) => state.employee);

  const dispatch = useDispatch();

  const handleRoleChange = (role: string) => {
    dispatch(setRoleEdit({ role }));
  };

  const handleFinish = () => {
    dispatch(editEmployeeRequest({ employee_id: employeeIdSelected }));
    setResult(true);
  };

  const handleCancel = () => {
    setVisibleEditModal(false);
    setResult(false);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
      <ItemStyled
        label="Cargo"
        name="role"
        rules={[
          {
            required: true,
            message: 'Por selecione o cargo do funcionário!',
          },
        ]}
      >
        <SelectStyled
          value={role}
          onChange={(value) => handleRoleChange(value.toString())}
          placeholder={'Selecione o cargo do funcionário'}
        >
          {roles.map((item) => {
            return (
              <Select.Option onChange={() => {}} value={item} key={item}>
                {item}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Editar
        </ButtonStyled>
      </ItemStyled>
      <ItemStyled>
        <ButtonStyled onClick={handleCancel}>Cancelar</ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default EditEmployeeForm;
