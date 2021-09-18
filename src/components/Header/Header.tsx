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
  Image,
} from './styles/Header';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../store/modules/auth/actions';
import { useUserRole } from '../../hooks/useUserRole';
import { timeout } from 'workbox-core/_private';

const Header: React.FC = () => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);
  const [visible, setVisible] = useState(false);

  const userRole = useUserRole();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    dispatch(logoutRequest());
    setTimeout(() => {
      if (!location.pathname.endsWith('/admin')) {
        history.push('/admin');
      }
    }, 1000);
  };

  const menu = (
    <Menu>
      {userRole !== 'ADMIN_BIOTRACE' && (
        <Menu.Item>
          <Link to="/admin/perfil">Meu Perfil</Link>
        </Menu.Item>
      )}
      <Menu.Item>
        <a onClick={() => logout()}>Sair</a>
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
        title={<Image src="/logo_Bioma.png" />}
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
