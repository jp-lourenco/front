import React, { useEffect, useState } from 'react';
import { MenuStyled, MenuItemStyled } from './styles/Drawer';
import { Link, useLocation } from 'react-router-dom';

const Drawer: React.FC = () => {
  const location = useLocation();

  const items = [
    { key: '1', label: 'Dashboard', path: '/admin/dashboard' },
    { key: '2', label: 'Meus Lotes', path: '/admin/lotes' },
    { key: '3', label: 'Entregar/Receber lote', path: '/admin/ler-qrcode' },
    { key: '4', label: 'Pesquisar QR Code', path: '/admin/pesquisar-qrcode' },
  ];

  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => location.pathname.startsWith(_item.path))?.key,
  );

  useEffect(() => {
    setSelectedKey(
      items.find((_item) => location.pathname.startsWith(_item.path))?.key,
    );
  }, [location]);

  return (
    <MenuStyled
      theme="dark"
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : ['1']}
    >
      {items.map((item) => (
        <MenuItemStyled key={item.key}>
          <Link to={item.path}>{item.label}</Link>
        </MenuItemStyled>
      ))}
    </MenuStyled>
  );
};
export default Drawer;
