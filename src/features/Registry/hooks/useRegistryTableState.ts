// src/features/registry/hooks/useRegistryTableState.ts
import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { exportRecords, fetchRecords } from "../api/registryService";
import type { IRecord } from "../types/registry";
import { useDebounce } from "./useDebounce";
import { notification } from "antd";

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
  const [exportLoading, setExportLoading] = useState(false);
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
  };

  const createPayload = useMemo(() => {
    return () => {
      const payload: Record<string, any> = {
        search: debouncedSearch.trim(),
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

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError("");
      const payload = createPayload();
      payload.page = page;

      const response = await fetchRecords(payload);
      if (response.status === 200) {
        setData(response?.data?.data || []);
        setTotalPages(response?.data?.pagination.totalPages || 1);
      } else {
        setError(response?.data?.message || "Failed to fetch records");
      }
    } catch (err) {
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setExportLoading(true);
      const payload = createPayload();
      const response = await exportRecords(payload);
      if (response.status === 200) {
        const csvData = convertToCSV(response?.data?.data || []);
        downloadCSV(csvData, "registry_records.csv");
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
    exportLoading,
    exportToCSV,
  };
};
