import React, { useContext } from 'react';
import { SiderStyled, Logo, ContainerLogo } from './styles/SideBar';
import Drawer from '../Drawer';
import { ToggleContext } from '../BasicLayout';

const SideBar: React.FC = () => {
  const { toggleShow } = useContext(ToggleContext);

  return (
    <SiderStyled
      theme="dark"
      collapsedWidth="0"
      collapsible
      collapsed={toggleShow}
      trigger={null}
    >
      <ContainerLogo>
        <Logo href="/#">BioTRACE</Logo>
      </ContainerLogo>
      <Drawer />
    </SiderStyled>
  );
};

export default SideBar;
