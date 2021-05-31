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
import { MySensorsContext } from '../MySensors';
import {
  getSensorsRequest,
  setMySensorsFiltered,
} from '../../../store/modules/sensor/actions';

const TableHeader: React.FC = () => {
  const { setVisibleCreateModal } = useContext(MySensorsContext);

  const [filterSelect, setFilterSelect] = useState('identificador');
  const [labelSearch, setlabelSearch] = useState('identificador');

  const { mySensors } = useSelector((state: any) => state.sensor);

  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const filteredSensors = mySensors.filter(
      (item: { [x: string]: string }) => {
        const value = item[filterSelect]?.toLowerCase();
        return value?.includes(searchText.toLowerCase());
      },
    );

    dispatch(setMySensorsFiltered({ mySensorsFiltered: filteredSensors }));
  };

  const handleFilter = ({ key }: any) => {
    const selected = parseInt(key);
    const statusMap = ['identificador'];
    const statusMaplabelSearch = ['identificador'];
    const value = statusMap[selected];
    const valuelabelSearch = statusMaplabelSearch[selected];
    setFilterSelect(value);
    setlabelSearch(valuelabelSearch);
  };

  const menu = () => {
    return (
      <Menu onClick={handleFilter}>
        <Menu.Item key="0">Indentificador</Menu.Item>
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
        onClick={() => dispatch(getSensorsRequest())}
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
        Registar Sensor
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
