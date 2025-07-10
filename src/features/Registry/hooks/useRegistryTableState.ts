// src/features/registry/hooks/useRegistryTableState.ts
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { fetchRecords } from "../api/registryService";
import type { IRecord } from "../types/registry";
import { useDebounce } from "./useDebounce";

export const useRegistryTableState = () => {
  const [data, setData] = useState<IRecord[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    state: [] as string[],
    gstStatus: [] as string[],
    entityType: [] as string[],
    lastUpdatedDate: null as Dayjs | null,
  });
  const debouncedSearch = useDebounce(filters.search, 500);

  const [sorter, setSorter] = useState<{
    field: string | null;
    order: "ascend" | "descend" | null;
  }>({ field: null, order: null });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetFilters = () => {
    setFilters({
      search: "",
      status: [],
      state: [],
      gstStatus: [],
      entityType: [],
      lastUpdatedDate: null,
    });
    setSorter({ field: null, order: null });
    setPage(1);
  };

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError("");
      const payload: Record<string, any> = {
        search: filters.search.trim(),
        page,
      };

      if (filters?.status?.length) payload.status = filters.status;
      if (filters?.state?.length) payload.state = filters.state;
      if (filters?.gstStatus?.length) payload.gstStatus = filters.gstStatus;
      if (filters?.entityType?.length) payload.entityType = filters.entityType;
      if (filters?.lastUpdatedDate)
        payload.lastUpdatedDate = filters.lastUpdatedDate.valueOf();
      if (sorter.field && sorter.order) {
        payload.sortBy = sorter.field;
        payload.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
      }

      const response = await fetchRecords(payload);
      if (response.status === 200) {
        setData(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        setError(response?.data?.message || "Failed to fetch records");
      }
    } catch (err) {
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [
    debouncedSearch,
    filters.status,
    filters.state,
    filters.gstStatus,
    filters.entityType,
    filters.lastUpdatedDate,
    sorter,
  ]);

  return {
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
  };
};
