import { Pagination, Table, Tag, Typography } from "antd";
import { columnHeaders } from "../../../constants/filtersData";
import dayjs from "dayjs";
import { useMemo } from "react";
import type { IRecord } from "../types/registry";

interface RegistryTableProps {
  data: IRecord[];
  loading: boolean;
  error: string;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetchData: (page: number) => void;
  setSorter: (sort: {
    field: string | null;
    order: "ascend" | "descend" | null;
  }) => void;
  sorter: {
    field: string | null;
    order: "ascend" | "descend" | null;
  };
}

const getStatusBadgeColor = (status: string): string => {
  const statusMap = {
    ACT: "green",
    CAN: "volcano",
    default: "default",
  };
  return statusMap[status as keyof typeof statusMap] || statusMap.default;
};

const RegistryTable: React.FC<RegistryTableProps> = ({
  data,
  loading,
  error,
  page,
  totalPages,
  setPage,
  fetchData,
  setSorter,
  sorter,
}) => {
  const columns = useMemo(() => {
    const defaultWidths: Record<string, number> = {
      abn: 140,
      name: 300,
      status: 120,
      state: 100,
      gstStatus: 150,
      entityType: 300,
      postcode: 100,
      recordLastUpdatedDate: 160,
      statusFromDate: 160,
    };

    const alignMap: Record<string, "left" | "right" | "center"> = {
      abn: "right",
      postcode: "right",
      status: "center",
      recordLastUpdatedDate: "center",
      statusFromDate: "center",
      gstStatus: "center",
    };

    return columnHeaders.map((col) => {
      const isDate =
        col.key === "recordLastUpdatedDate" || col.key === "statusFromDate";
      const isEntityType = col.key === "entityType";

      return {
        title: col.label,
        dataIndex: isEntityType ? ["entityType", "text"] : col.key,
        key: col.key,
        sorter: true,
        sortOrder: sorter?.field === col.key ? sorter.order : null,
        width: defaultWidths[col.key] || 150,
        align: alignMap[col.key] || "left",
        render: (text: any) => {
          if (col.key === "status") {
            return <Tag color={getStatusBadgeColor(text)}>{text}</Tag>;
          }
          if (isDate) {
            return dayjs(text).format("DD MMM YYYY");
          }
          return text;
        },
      };
    });
  }, [sorter]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(pagination);
    console.log(filters);

    if (!Array.isArray(sorter)) {
      setSorter({
        field: sorter.columnKey as string,
        order: sorter.order as "ascend" | "descend" | null,
      });
    }
  };

  if (error) {
    return <Typography.Text type="danger">{error}</Typography.Text>;
  }

  return (
    <div style={{ width: "100%" }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="abn"
        loading={loading}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
      />
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
      >
        <Pagination
          current={page}
          total={totalPages * 10}
          pageSize={10}
          onChange={(newPage) => {
            setPage(newPage);
            fetchData(newPage);
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default RegistryTable;
