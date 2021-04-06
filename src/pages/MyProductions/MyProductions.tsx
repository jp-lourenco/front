import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import ProductionsTable from './components/ProductionsTable';
import { Batch, Production } from '../../store/modules/production/types';
import TraceModal from './components/TraceModal';
import EditModal from './components/Edit/EditModal';
import CreateModal from './components/Create/CreateModal';
import QrcodeList from './components/QrcodeList/QrcodeList';

export const MyProductionsContext = createContext({
  batchSelected: {
    key: '',
    batch_code: '',
    current_state: '',
    history: [],
  },
  setBatchSelected: (batchSelected: Batch) => {},
  visibleTraceModal: false,
  setVisibleTraceModal: (visibleTraceModal: boolean) => {},
  productionSelected: { key: '' },
  setProductionSelected: (productionSelected: Production) => {},
  visibleEditModal: false,
  setVisibleEditModal: (visibleEditModal: boolean) => {},
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
  selectedRowKeys: [],
  setSelectedRowKeys: (selectedRowKeys: React.Key[]) => {},
});

const MyProductions: React.FC = () => {
  const [visibleTraceModal, setVisibleTraceModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [productionSelected, setProductionSelected] = useState<any>([]);
  const [batchSelected, setBatchSelected] = useState<any>({
    key: '',
    batch_code: '',
    current_state: '',
    history: [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  return (
    <MyProductionsContext.Provider
      value={{
        batchSelected,
        setBatchSelected,
        visibleTraceModal,
        setVisibleTraceModal,
        productionSelected,
        setProductionSelected,
        visibleEditModal,
        setVisibleEditModal,
        visibleCreateModal,
        setVisibleCreateModal,
        selectedRowKeys,
        setSelectedRowKeys,
      }}
    >
      <TableHeader />
      <ProductionsTable />
      <TraceModal />
      <EditModal />
      <CreateModal />
      <QrcodeList />
    </MyProductionsContext.Provider>
  );
};

export default MyProductions;
