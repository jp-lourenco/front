import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import {
  HeaderStyled,
  Label,
  LinkDropdownStyled,
  SearchStyled,
  ButtonRefresh,
} from '../../../styles/App';
import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import {
  getCompaniesRequest,
  setCompaniesFiltered,
} from '../../../store/modules/company/actions';

const TableHeader: React.FC = () => {
  const [filterSelect, setFilterSelect] = useState('name');
  const [labelSearch, setlabelSearch] = useState('nome');

  const { companies } = useSelector((state: any) => state.company);

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const companiesFiltered = companies?.filter(
      (item: { [x: string]: string }) => {
        const value = item[filterSelect]?.toLowerCase();
        return value?.includes(searchText.toLowerCase());
      },
    );

    dispatch(setCompaniesFiltered({ companiesFiltered: companiesFiltered }));
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
        onClick={() => dispatch(getCompaniesRequest())}
      >
        <SyncOutlined />
      </ButtonRefresh>
    </HeaderStyled>
  );
};

export default TableHeader;
