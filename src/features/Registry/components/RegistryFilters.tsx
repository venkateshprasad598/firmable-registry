import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row } from "antd";
import type { Dayjs } from "dayjs";
import {
  entityTypeOptions,
  gstStatusOptions,
  stateOptions,
  statusOptions,
} from "../../../constants";
import { MultiSelectFilter } from "../../../shared";

export interface RegistryFiltersProps {
  filters: {
    search: string;
    entityType: string[];
    status: string[];
    state: string[];
    gstStatus: string[];
    lastUpdatedDate: Dayjs | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<RegistryFiltersProps["filters"]>
  >;
  resetFilters: () => void;
  exportLoading: boolean;
  exportToCSV: () => void;
  setPage: (page: number) => void;
}

export const RegistryFilters = ({
  filters,
  setFilters,
  resetFilters,
  exportLoading,
  exportToCSV,
  setPage,
}: RegistryFiltersProps) => {
  const handleFilterChange = <K extends keyof RegistryFiltersProps["filters"]>(
    key: K,
    value: RegistryFiltersProps["filters"][K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <Row gutter={[16, 16]} className="mb-4" data-testid="registry-filters-row">
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name or ABN..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          data-testid="filter-search-input"
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <MultiSelectFilter
          value={filters.entityType}
          onChange={(val) => handleFilterChange("entityType", val)}
          style={{ width: "100%" }}
          placeholder="Filter by Entity Type"
          options={entityTypeOptions}
          data-testid="filter-entity-type-select"
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <MultiSelectFilter
          value={filters.status}
          onChange={(val) => handleFilterChange("status", val)}
          style={{ width: "100%" }}
          placeholder="Filter by Status"
          options={statusOptions}
          data-testid="filter-status-select"
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <MultiSelectFilter
          value={filters.state}
          onChange={(val) => handleFilterChange("state", val)}
          style={{ width: "100%" }}
          placeholder="Filter by State"
          options={stateOptions}
          data-testid="filter-state-select"
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <MultiSelectFilter
          value={filters.gstStatus}
          onChange={(val) => handleFilterChange("gstStatus", val)}
          style={{ width: "100%" }}
          placeholder="Filter by GST Status"
          options={gstStatusOptions}
          data-testid="filter-gst-status-select"
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <DatePicker
          style={{ width: "100%" }}
          value={filters.lastUpdatedDate}
          onChange={(date) => handleFilterChange("lastUpdatedDate", date)}
          placeholder="Last Updated From"
          data-testid="filter-last-updated-date-picker"
        />
      </Col>

      <Col>
        <Button
          style={{ width: "100%" }}
          onClick={resetFilters}
          data-testid="reset-filters-btn"
        >
          Reset Filters
        </Button>
      </Col>
      <Col>
        <Button
          type="default"
          onClick={exportToCSV}
          loading={exportLoading}
          className="mb-4"
          data-testid="export-csv-btn"
        >
          Export to CSV
        </Button>
      </Col>
    </Row>
  );
};
