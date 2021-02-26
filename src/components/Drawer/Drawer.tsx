import React from 'react';
import { MenuStyled, MenuItemStyled } from './styles/Drawer';
import { Link } from 'react-router-dom';

const Drawer: React.FC = () => {
  const topics: string[] = ['1', '2', '3'];

  const styledTopics: JSX.Element[] = [];

  topics.forEach((topic: string, index: number) =>
    styledTopics.push(
      <MenuItemStyled key={index}>
        <Link to={topic}>{topic}</Link>
      </MenuItemStyled>,
    ),
  );

  return (
    <MenuStyled theme="dark" mode="inline" defaultSelectedKeys={['0']}>
      {styledTopics}
    </MenuStyled>
  );
};
export default Drawer;
