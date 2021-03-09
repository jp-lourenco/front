import React, { useState, createContext } from 'react';
import { Layout } from 'antd';
import { ContentStyled } from './styles/BasicLayout';
import Header from '../Header';
import SideBar from '../SideBar';

interface ContextProps {
  toggleShow: boolean;
  setToggleShow: (toggleShow: boolean) => void;
}

export const ToggleContext = createContext<ContextProps>({
  toggleShow: true,
  setToggleShow: () => {},
});

const BasicLayout: React.FC = ({ children }) => {
  const [toggleShow, setToggleShow] = useState<boolean>(true);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Layout>
        <SideBar />
        <Layout>
          <Header />
          <ContentStyled>{children}</ContentStyled>
        </Layout>
      </Layout>
    </ToggleContext.Provider>
  );
};

export default BasicLayout;
