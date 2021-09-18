import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import SubBatchsTable from './components/SubBatchsTable';
import { SubBatch } from '../../store/modules/subbatch/types';
import TraceModal from './components/TraceModal';
import EditModal from './components/Edit/EditModal';
import CreateModal from './components/Create/CreateModal';
import QrcodeList from './components/QrcodeList/QrcodeList';

export const MySubBatchsContext = createContext({
  subBatchSelected: {
    key: '',
    subbatch_code: '',
    current_state: '',
    batchs_father: [],
    history: [],
  },
  setSubBatchSelected: (batchSelected: SubBatch) => {},
  visibleTraceModal: false,
  setVisibleTraceModal: (visibleTraceModal: boolean) => {},
  visibleEditModal: false,
  setVisibleEditModal: (visibleEditModal: boolean) => {},
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
  selectedRowKeys: [],
  setSelectedRowKeys: (selectedRowKeys: React.Key[]) => {},
});

const MySubBatchs: React.FC = () => {
  const [visibleTraceModal, setVisibleTraceModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [subBatchSelected, setSubBatchSelected] = useState<any>({
    key: '',
    subbatch_code: '',
    current_state: '',
    history: [],
    batchs_father: [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  return (
    <MySubBatchsContext.Provider
      value={{
        subBatchSelected,
        setSubBatchSelected,
        visibleTraceModal,
        setVisibleTraceModal,
        visibleEditModal,
        setVisibleEditModal,
        visibleCreateModal,
        setVisibleCreateModal,
        selectedRowKeys,
        setSelectedRowKeys,
      }}
    >
      <TableHeader />
      <SubBatchsTable />
      <TraceModal />
      <EditModal />
      <CreateModal />
      <QrcodeList />
    </MySubBatchsContext.Provider>
  );
};

export default MySubBatchs;
