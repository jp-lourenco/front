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
import { FoodsContext } from '../Foods';
import {
  getFoodsRequest,
  setFoodsFiltered,
} from '../../../store/modules/food/actions';

const TableHeader: React.FC = () => {
  const { setVisibleCreateModal } = useContext(FoodsContext);

  const [filterSelect, setFilterSelect] = useState('food_name');
  const [labelSearch, setlabelSearch] = useState('nome');

  const { foods } = useSelector((state: any) => state.food);

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const foodsFiltered = foods.filter((item: { [x: string]: string }) => {
      const value = item[filterSelect]?.toLowerCase();
      return value?.includes(searchText.toLowerCase());
    });
    dispatch(setFoodsFiltered({ foodsFiltered: foodsFiltered }));
  };

  const handleFilter = ({ key }: any) => {
    const selected = parseInt(key);
    const statusMap = ['food_name', 'category'];
    const statusMaplabelSearch = ['nome', 'categoria'];
    const value = statusMap[selected];
    const valuelabelSearch = statusMaplabelSearch[selected];
    setFilterSelect(value);
    setlabelSearch(valuelabelSearch);
  };

  const menu = () => {
    return (
      <Menu onClick={handleFilter}>
        <Menu.Item key="0">Nome</Menu.Item>
        <Menu.Item key="1">Categoria</Menu.Item>
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
        onClick={() => dispatch(getFoodsRequest())}
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
        Registar Alimento
      </ButtonAdd>
      <ButtonIconAdd
        icon={<PlusOutlined />}
        size="small"
        shape="circle"
        type="primary"
        onClick={() => setVisibleCreateModal(true)}
      />
    </HeaderStyled>
  );
};

export default TableHeader;
