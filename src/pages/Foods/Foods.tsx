import React, { createContext, useState } from 'react';
import CreateFoodModal from './components/CreateFood/CreateFoodModal';
import FoodsTable from './components/FoodsTable';
import TableHeader from './components/TableHeader';

export const FoodsContext = createContext({
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
});

const Foods: React.FC = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);

  return (
    <FoodsContext.Provider
      value={{
        visibleCreateModal,
        setVisibleCreateModal,
      }}
    >
      <TableHeader />
      <FoodsTable />
      <CreateFoodModal />
    </FoodsContext.Provider>
  );
};

export default Foods;
