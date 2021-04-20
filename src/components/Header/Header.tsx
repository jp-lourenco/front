import React, { useContext, useState } from 'react';
import Drawer from '../Drawer';
import { ToggleContext } from '../BasicLayout';
import {
  HeaderStyled,
  MenuFoldOutlinedStyled,
  MenuOutlinedStyled,
  MenuUnfoldOutlinedStyled,
  DrawerStyled,
  AvatarStyled,
} from './styles/Header';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../store/modules/auth/actions';

const Header: React.FC = () => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/admin/perfil">Meu Perfil</Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => dispatch(logoutRequest())}>Sair</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderStyled>
      {toggleShow ? (
        <MenuFoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      ) : (
        <MenuUnfoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      )}
      <MenuOutlinedStyled onClick={() => setVisible(true)} />
      <DrawerStyled
        title="BioTRACE"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Drawer />
      </DrawerStyled>
      <Dropdown overlay={menu} placement="bottomRight">
        <AvatarStyled size="large" icon={<UserOutlined />} />
      </Dropdown>
    </HeaderStyled>
  );
};

export default Header;
