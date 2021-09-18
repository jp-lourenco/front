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
import { MySubBatchsContext } from '../MySubBatchs';
import { useUserRole } from '../../../hooks/useUserRole';
import {
  getSubBatchsByUserRequest,
  setMySubBatchsFiltered,
} from '../../../store/modules/subbatch/actions';

const TableHeader: React.FC = () => {
  const { setVisibleCreateModal } = useContext(MySubBatchsContext);

  const [filterSelect, setFilterSelect] = useState('product_name');
  const [labelSearch, setlabelSearch] = useState('nome');

  const { mySubBatchs } = useSelector((state: any) => state.subbatch);

  const userRole = useUserRole();

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const filteredSubBatchs = mySubBatchs.filter(
      (item: { [x: string]: string }) => {
        const value = item[filterSelect]?.toLowerCase();
        return value?.includes(searchText.toLowerCase());
      },
    );

    dispatch(
      setMySubBatchsFiltered({ mySubBatchsFiltered: filteredSubBatchs }),
    );
  };

  const handleFilter = ({ key }: any) => {
    const selected = parseInt(key);
    const statusMap = ['product_name', 'transformation_description'];
    const statusMaplabelSearch = ['nome', 'descrição'];
    const value = statusMap[selected];
    const valuelabelSearch = statusMaplabelSearch[selected];
    setFilterSelect(value);
    setlabelSearch(valuelabelSearch);
  };

  const menu = () => {
    return (
      <Menu onClick={handleFilter}>
        <Menu.Item key="0">Nome</Menu.Item>
        <Menu.Item key="2">Descrição</Menu.Item>
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
        onClick={() => dispatch(getSubBatchsByUserRequest())}
      >
        <SyncOutlined />
      </ButtonRefresh>
      {userRole === 'ADMIN_TRANSFORMER' ? (
        <ButtonAdd
          icon={<PlusOutlined />}
          size="small"
          shape="round"
          type="primary"
          onClick={() => setVisibleCreateModal(true)}
        >
          Novo sublote
        </ButtonAdd>
      ) : (
        ''
      )}
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
