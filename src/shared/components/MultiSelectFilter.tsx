import { Select } from "antd";
import React from "react";

type MultiSelectFilterProps = {
  value: any;
  onChange: (val: any) => void;
  options: any[];
  placeholder?: string;
  "data-testid"?: string;
  style?: React.CSSProperties;
};

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  value,
  onChange,
  options,
  placeholder,
  "data-testid": dataTestId,
  style,
}) => (
  <Select
    mode="multiple"
    allowClear
    showSearch
    value={value}
    onChange={onChange}
    style={style || { width: "100%" }}
    placeholder={placeholder}
    options={options}
    filterOption={(input, option) =>
      (option?.label ?? "")
        .toString()
        .toLowerCase()
        .includes(input.toLowerCase())
    }
    data-testid={dataTestId}
  />
);
