import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import type { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { exportRecords, fetchRecords } from "../services";
import { useDebounce } from "./useDebounce";

export const useRegistryTableState = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    state: [] as string[],
    gstStatus: [] as string[],
    entityType: [] as string[],
    lastUpdatedDate: null as Dayjs | null,
  });
  const [sorter, setSorter] = useState<{
    field: string | null;
    order: "ascend" | "descend" | null;
  }>({ field: null, order: null });
  const [page, setPage] = useState(1);
  const [exportLoading, setExportLoading] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 500);

  const createPayload = useMemo(() => {
    return () => {
      const payload: Record<string, any> = {};

      if (debouncedSearch.trim()?.length)
        payload.search = debouncedSearch.trim();
      if (filters?.status?.length) payload.status = filters.status;
      if (filters?.state?.length) payload.state = filters.state;
      if (filters?.gstStatus?.length) payload.gstStatus = filters.gstStatus;
      if (filters?.entityType?.length) payload.entityType = filters.entityType;
      if (filters?.lastUpdatedDate)
        payload.lastUpdatedDate = filters.lastUpdatedDate.valueOf();
      if (sorter?.field && sorter?.order) {
        payload.sortBy = sorter.field;
        payload.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
      }
      payload.page = page;
      return payload;
    };
  }, [
    debouncedSearch,
    filters.status,
    filters.state,
    filters.gstStatus,
    filters.entityType,
    filters.lastUpdatedDate,
    sorter,
    page,
  ]);

  const {
    data: queryData,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: [
      "registry-records",
      debouncedSearch,
      filters.status,
      filters.state,
      filters.gstStatus,
      filters.entityType,
      filters.lastUpdatedDate,
      sorter,
      page,
    ],
    queryFn: async () => {
      const payload = createPayload();
      const response = await fetchRecords(payload);
      if (response.status === 200) {
        return response?.data || [];
      } else {
        throw new Error(response?.data?.message || "Failed to fetch records");
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const data = queryData?.data || [];
  const totalPages = queryData?.pagination?.totalPages || 1;
  const error = queryError ? (queryError as Error).message : "";

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

  const exportToCSV = async () => {
    try {
      setExportLoading(true);
      const payload = createPayload();
      const response = await exportRecords(payload);
      if (response?.status === 200) {
        const csvData = convertToCSV(response?.data?.data || []);
        downloadCSV(csvData, "firmable_registry_records.csv");
        notification.success({
          message: "Success",
          description: "Records exported successfully",
        });
      } else {
        throw new Error(response?.data?.message || "Failed to export records");
      }
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to export records. Please try again.",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return "";
    const headers = [
      "abn",
      "name",
      "status",
      "statusFromDate",
      "gstStatus",
      "state",
      "postcode",
      "entityType",
      "recordLastUpdatedDate",
    ];

    const csvRows: string[] = [];
    csvRows.push(headers.join(","));
    for (const record of data) {
      const row = headers.map((header) => {
        let value: any = record[header];
        if (header === "entityType" && typeof record.entityType === "object") {
          value = record.entityType.text || record.entityType.ind || "";
        }
        if (
          ["statusFromDate", "recordLastUpdatedDate"].includes(header) &&
          typeof value === "number"
        ) {
          const date = new Date(value);
          value = date.toLocaleDateString("en-AU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        if (header === "abn") {
          value = `"${String(value).padStart(11, "0")}"`;
          return value;
        }
        if (typeof value === "string") {
          value = value.replace(/"/g, '""');
        }
        return `"${value ?? ""}"`;
      });
      csvRows.push(row.join(","));
    }
    return csvRows.join("\n");
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
    exportLoading,
    exportToCSV,
  };
};
