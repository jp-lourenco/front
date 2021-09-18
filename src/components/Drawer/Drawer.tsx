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
      notAllowed: [''],
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
      notAllowed: [''],
    },
    {
      key: '8',
      label: 'Meus Sublotes',
      path: '/admin/sublotes',
      roles: ['ADMIN_TRANSFORMER', 'MANAGER_TRANSFORTER'],
      notAllowed: [''],
    },
    {
      key: '3',
      label: 'Entregar/Receber lote',
      path: '/admin/ler-qrcode',
      roles: '*',
      notAllowed: ['ADMIN_BIOTRACE'],
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
      notAllowed: [''],
    },
    {
      key: '5',
      label: 'Meus Sensores',
      path: '/admin/sensores',
      roles: [
        'ADMIN_TRANSPORTER',
        'MANAGER_TRANSPORTER',
        'ADMIN_STORER',
        'MANAGER_STORER',
      ],
      notAllowed: [''],
    },
    {
      key: '6',
      label: 'Empresas',
      path: '/admin/empresas',
      roles: ['ADMIN_BIOTRACE'],
      notAllowed: [''],
    },
    {
      key: '7',
      label: 'Alimentos',
      path: '/admin/alimentos',
      roles: ['ADMIN_BIOTRACE'],
      notAllowed: [''],
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
        if (
          (item.roles === '*' || item.roles?.includes(userRole)) &&
          !item.notAllowed?.includes(userRole)
        ) {
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
