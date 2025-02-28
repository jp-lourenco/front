import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import ProductionsTable from './components/ProductionsTable';
import { Batch, Production } from '../../store/modules/production/types';
import TraceModal from './components/TraceModal';
import EditModal from './components/Edit/EditModal';
import EditBatchModal from './components/EditBatch/EditBatchModal';
import CreateModal from './components/Create/CreateModal';
import QrcodeList from './components/QrcodeList/QrcodeList';
import EditFilesModal from './components/EditFiles/EditFilesModal';

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
  productionSelected: { key: '', images_filename: [], videos_filename: [] },
  setProductionSelected: (productionSelected: Production) => {},
  visibleEditFilesModal: false,
  setVisibleEditFilesModal: (visibleEditFilesModal: boolean) => {},
  visibleEditModal: false,
  setVisibleEditModal: (visibleEditModal: boolean) => {},
  visibleEditBatchModal: false,
  setVisibleEditBatchModal: (visibleEditBatchModal: boolean) => {},
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
  selectedRowKeys: [],
  setSelectedRowKeys: (selectedRowKeys: React.Key[]) => {},
});

const MyProductions: React.FC = () => {
  const [visibleTraceModal, setVisibleTraceModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleEditFilesModal, setVisibleEditFilesModal] = useState(false);
  const [visibleEditBatchModal, setVisibleEditBatchModal] = useState(false);
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
        visibleEditFilesModal,
        setVisibleEditFilesModal,
        visibleEditBatchModal,
        setVisibleEditBatchModal,
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
      <EditFilesModal />
      <EditBatchModal />
      <CreateModal />
      <QrcodeList />
    </MyProductionsContext.Provider>
  );
};

export default MyProductions;
