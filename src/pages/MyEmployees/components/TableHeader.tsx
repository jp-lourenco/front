import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import {
  HeaderStyled,
  Label,
  LinkDropdownStyled,
  SearchStyled,
  ButtonRefresh,
  ButtonAdd,
  ButtonIconAdd,
} from '../../../styles/App';
import { DownOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { MyEmployeesContext } from '../MyEmployees';
import {
  getEmployeesRequest,
  setMyEmployeesFiltered,
} from '../../../store/modules/employee/actions';

const TableHeader: React.FC = () => {
  const { setVisibleCreateModal } = useContext(MyEmployeesContext);

  const [filterSelect, setFilterSelect] = useState('name');
  const [labelSearch, setlabelSearch] = useState('nome');

  const { myEmployees } = useSelector((state: any) => state.employee);

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const filteredEmployees = myEmployees.filter(
      (item: { [x: string]: string }) => {
        const value = item[filterSelect]?.toLowerCase();
        return value?.includes(searchText.toLowerCase());
      },
    );

    dispatch(
      setMyEmployeesFiltered({ myEmployeesFiltered: filteredEmployees }),
    );
  };

  const handleFilter = ({ key }: any) => {
    const selected = parseInt(key);
    const statusMap = ['name', 'email'];
    const statusMaplabelSearch = ['nome', 'email'];
    const value = statusMap[selected];
    const valuelabelSearch = statusMaplabelSearch[selected];
    setFilterSelect(value);
    setlabelSearch(valuelabelSearch);
  };

  const menu = () => {
    return (
      <Menu onClick={handleFilter}>
        <Menu.Item key="0">Nome</Menu.Item>
        <Menu.Item key="1">Email</Menu.Item>
      </Menu>
    );
  };

  return (
    <HeaderStyled>
      <Dropdown className="filter" overlay={menu}>
        <LinkDropdownStyled className="ant-dropdown-link" href="#">
          Pesquisar por <DownOutlined />
        </LinkDropdownStyled>
      </Dropdown>
      <Label>{labelSearch}</Label>
      <SearchStyled
        placeholder={`Digite o ${labelSearch}`}
        onSearch={handleSearch}
      />
      <ButtonRefresh
        size="small"
        type="primary"
        shape="circle"
        onClick={() => dispatch(getEmployeesRequest())}
      >
        <SyncOutlined />
      </ButtonRefresh>
      <ButtonAdd
        icon={<PlusOutlined />}
        size="small"
        shape="round"
        type="primary"
        onClick={() => setVisibleCreateModal(true)}
      >
        Registar Funcionário
      </ButtonAdd>
      <ButtonIconAdd
        icon={<PlusOutlined />}
        size="small"
        shape="round"
        type="primary"
        onClick={() => setVisibleCreateModal(true)}
      />
    </HeaderStyled>
  );
};

export default TableHeader;
