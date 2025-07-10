import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import {
  entityTypeOptions,
  gstStatusOptions,
  stateOptions,
  statusOptions,
} from "../../../constants/filtersData";

const RegistryFilters = ({
  filters,
  setFilters,
  resetFilters,
  exportLoading,
  exportToCSV,
}: {
  filters: any;
  setFilters: any;
  resetFilters: () => void;
  exportLoading: boolean;
  exportToCSV: () => void;
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name or ABN..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev: any) => ({ ...prev, search: e.target.value }))
          }
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          value={filters.entityType}
          onChange={(val) =>
            setFilters((prev: any) => ({ ...prev, entityType: val }))
          }
          style={{ width: "100%" }}
          placeholder="Filter by Entity Type"
          options={entityTypeOptions}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          value={filters.status}
          onChange={(val) =>
            setFilters((prev: any) => ({ ...prev, status: val }))
          }
          style={{ width: "100%" }}
          placeholder="Filter by Status"
          options={statusOptions}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          value={filters.state}
          onChange={(val) =>
            setFilters((prev: any) => ({ ...prev, state: val }))
          }
          style={{ width: "100%" }}
          placeholder="Filter by State"
          options={stateOptions}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          value={filters.gstStatus}
          onChange={(val) =>
            setFilters((prev: any) => ({ ...prev, gstStatus: val }))
          }
          style={{ width: "100%" }}
          placeholder="Filter by GST Status"
          options={gstStatusOptions}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <DatePicker
          style={{ width: "100%" }}
          value={filters.lastUpdatedDate}
          onChange={(date) =>
            setFilters((prev: any) => ({ ...prev, lastUpdatedDate: date }))
          }
          placeholder="Last Updated From"
        />
      </Col>

      <Col>
        <Button style={{ width: "100%" }} onClick={resetFilters}>
          Reset Filters
        </Button>
      </Col>
      <Col>
        <Button
          type="default"
          onClick={exportToCSV}
          loading={exportLoading}
          className="mb-4"
        >
          Export to CSV
        </Button>
      </Col>
    </Row>
  );
};

export default RegistryFilters;
