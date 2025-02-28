import React, { useContext, useEffect, useState } from 'react';
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
import {
  getProductionsByUserRequest,
  setMyProductionsFiltered,
} from '../../../store/modules/production/actions';
import { MyProductionsContext } from '../MyProductions';
import { useUserRole } from '../../../hooks/useUserRole';
import { useLocation } from 'react-router';

const TableHeader: React.FC = () => {
  const { setVisibleCreateModal } = useContext(MyProductionsContext);

  const [filterSelect, setFilterSelect] = useState('title');
  const [labelSearch, setlabelSearch] = useState('título');

  const { myProductions } = useSelector((state: any) => state.production);

  const userRole = useUserRole();

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const filteredProductions = myProductions.filter(
      (item: { [x: string]: string }) => {
        const value = item[filterSelect]?.toLowerCase();
        return value?.includes(searchText.toLowerCase());
      },
    );

    dispatch(
      setMyProductionsFiltered({ myProductionsFiltered: filteredProductions }),
    );
  };

  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const search = location.search.split('=')[1];
      handleSearch(decodeURIComponent(search));
    }
  }, [myProductions]);

  const handleFilter = ({ key }: any) => {
    const selected = parseInt(key);
    const statusMap = [
      'title',
      'category',
      'food_name',
      'production_description',
    ];
    const statusMaplabelSearch = [
      'título',
      'categoria',
      'alimento',
      'descrição',
    ];
    const value = statusMap[selected];
    const valuelabelSearch = statusMaplabelSearch[selected];
    setFilterSelect(value);
    setlabelSearch(valuelabelSearch);
  };

  const menu = () => {
    return (
      <Menu onClick={handleFilter}>
        <Menu.Item key="0">Título</Menu.Item>
        <Menu.Item key="1">Categoria</Menu.Item>
        <Menu.Item key="2">Alimento</Menu.Item>
        <Menu.Item key="3">Descrição</Menu.Item>
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
        onClick={() => dispatch(getProductionsByUserRequest())}
      >
        <SyncOutlined />
      </ButtonRefresh>
      {userRole === 'ADMIN_PRODUCER' ? (
        <ButtonAdd
          icon={<PlusOutlined />}
          size="small"
          shape="round"
          type="primary"
          onClick={() => setVisibleCreateModal(true)}
        >
          Nova produção
        </ButtonAdd>
      ) : (
        ''
      )}
      {userRole === 'ADMIN_PRODUCER' ? (
        <ButtonIconAdd
          icon={<PlusOutlined />}
          size="small"
          shape="circle"
          type="primary"
          onClick={() => setVisibleCreateModal(true)}
        />
      ) : (
        ''
      )}
    </HeaderStyled>
  );
};

export default TableHeader;
