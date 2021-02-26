import React, { useContext } from 'react';
import { ToggleContext } from '../BasicLayout';
import {
  HeaderStyled,
  MenuFoldOutlinedStyled,
  MenuUnfoldOutlinedStyled,
} from './styles/Header';

const Header: React.FC = () => {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <HeaderStyled>
      {toggleShow ? (
        <MenuUnfoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      ) : (
        <MenuFoldOutlinedStyled onClick={() => setToggleShow(!toggleShow)} />
      )}
    </HeaderStyled>
  );
};

export default Header;
