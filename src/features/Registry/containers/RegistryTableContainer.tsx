import { RegistryFilters, RegistryTable, SectionHeader } from "../components";
import { useRegistryTableState } from "../hooks";

export const RegistryTableContainer = () => {
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
    exportLoading,
    exportToCSV,
  } = useRegistryTableState();

  return (
    <div className="border p-4 rounded-xl">
      <SectionHeader title="Firmable" />
      <RegistryFilters
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        exportLoading={exportLoading}
        exportToCSV={exportToCSV}
        setPage={setPage}
      />
      <RegistryTable
        data={data}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        setSorter={setSorter}
        sorter={sorter}
      />
    </div>
  );
};
