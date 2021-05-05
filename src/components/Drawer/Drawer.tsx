import React, { useEffect, useState } from 'react';
import { MenuStyled, MenuItemStyled } from './styles/Drawer';
import { Link, useLocation } from 'react-router-dom';
import { useUserRole } from '../../hooks/useUserRole';

const Drawer: React.FC = () => {
  const location = useLocation();

  const userRole = useUserRole();

  const items = [
    {
      key: '1',
      label: 'Dashboard',
      path: '/admin/dashboard',
      roles: '*',
    },
    {
      key: '2',
      label: 'Minhas Produções',
      path: '/admin/producoes',
      roles: [
        'ADMIN_PRODUCER',
        'ADMIN_TRANSPORTER',
        'ADMIN_TRANSFORMER',
        'ADMIN_STORER',
        'ADMIN_SHOPKEEPER',
        'MANAGER_PRODUCER',
        'MANAGER_TRANSPORTER',
        'MANAGER_TRANSFORMER',
        'MANAGER_STORER',
        'MANAGER_SHOPKEEPER',
      ],
    },
    {
      key: '3',
      label: 'Entregar/Receber lote',
      path: '/admin/ler-qrcode',
      roles: '*',
    },
    {
      key: '4',
      label: 'Meus Funcionários',
      path: '/admin/funcionarios',
      roles: [
        'ADMIN_PRODUCER',
        'ADMIN_TRANSPORTER',
        'ADMIN_TRANSFORMER',
        'ADMIN_STORER',
        'ADMIN_SHOPKEEPER',
      ],
    },
    {
      key: '5',
      label: 'Pesquisar QR Code',
      path: '/admin/pesquisar-qrcode',
      roles: ['EMPLOYEE_PRODUCER'],
    },
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
      selectedKeys={selectedKey ? [selectedKey] : ['']}
    >
      {items.map((item) => {
        if (item.roles === '*' || item.roles?.includes(userRole)) {
          return (
            <MenuItemStyled key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </MenuItemStyled>
          );
        }
      })}
    </MenuStyled>
  );
};
export default Drawer;
