// src/features/registry/containers/RegistryTableContainer.tsx
import RegistryFilters from "../components/RegistryFilters";
import RegistryTable from "../components/RegistryTable";
import { useRegistryTableState } from "../hooks/useRegistryTableState";

const RegistryTableContainer = () => {
  const {
    data,
    filters,
    setFilters,
    resetFilters,
    sorter,
    setSorter,
    page,
    setPage,
    totalPages,
    loading,
    error,
    fetchData,
  } = useRegistryTableState();

  return (
    <div className="border p-4 rounded-xl">
      <p className="text-3xl mb-4">Firmable</p>
      <RegistryFilters
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      <RegistryTable
        data={data}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        fetchData={fetchData}
        setSorter={setSorter}
        sorter={sorter}
      />
    </div>
  );
};

export default RegistryTableContainer;
