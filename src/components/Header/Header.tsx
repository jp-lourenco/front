import React, { useContext, useEffect, useState } from 'react';
import Drawer from '../Drawer';
import { ToggleContext } from '../BasicLayout';
import {
  HeaderStyled,
  MenuFoldOutlinedStyled,
  MenuOutlinedStyled,
  MenuUnfoldOutlinedStyled,
  DrawerStyled,
} from './styles/Header';

const Header: React.FC = () => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 992) {
      setToggleShow(true);
    }
  }, []);

  return (
    <HeaderStyled>
      {toggleShow ? (
        <MenuFoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      ) : (
        <MenuUnfoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      )}
      <MenuOutlinedStyled onClick={() => setVisible(true)} />
      <DrawerStyled
        title="BIOTrace"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Drawer />
      </DrawerStyled>
    </HeaderStyled>
  );
};

export default Header;
