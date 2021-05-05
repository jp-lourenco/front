import React, { useContext } from 'react';
import { SiderStyled, Logo, ContainerLogo, Image } from './styles/SideBar';
import Drawer from '../Drawer';
import { ToggleContext } from '../BasicLayout';

const SideBar: React.FC = () => {
  const { toggleShow } = useContext(ToggleContext);

  return (
    <SiderStyled
      theme="dark"
      width="256"
      collapsedWidth="0"
      collapsible
      collapsed={!toggleShow}
      trigger={null}
    >
      <ContainerLogo>
        <Logo href="/#">
          <Image src="/logo_Bioma.png" />
        </Logo>
      </ContainerLogo>
      <Drawer />
    </SiderStyled>
  );
};

export default SideBar;
