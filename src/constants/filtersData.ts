export const statusOptions = [
  { label: "Active (ACT)", value: "ACT" },
  { label: "Cancelled (CAN)", value: "CAN" }
];

export const stateOptions = [
  { label: "Australian Capital Territory (ACT)", value: "ACT" },
  { label: "New South Wales (NSW)", value: "NSW" },
  { label: "Northern Territory (NT)", value: "NT" },
  { label: "Queensland (QLD)", value: "QLD" },
  { label: "South Australia (SA)", value: "SA" },
  { label: "Tasmania (TAS)", value: "TAS" },
  { label: "Victoria (VIC)", value: "VIC" },
  { label: "Western Australia (WA)", value: "WA" }
];

export const gstStatusOptions = [
  { label: "GST Active (ACT)", value: "ACT" },
  { label: "GST Cancelled (CAN)", value: "CAN" },
  { label: "Not Registered (NON)", value: "NON" }
];

export const entityTypeOptions = [
  { label: "ATO Regulated Self-Managed Superannuation Fund", value: "SMF" },
  { label: "Deceased Estate", value: "DES" },
  { label: "Discretionary Investment Trust", value: "DIT" },
  { label: "Discretionary Services Management Trust", value: "DST" },
  { label: "Discretionary Trading Trust", value: "DTT" },
  { label: "Family Partnership", value: "FPT" },
  { label: "Fixed Unit Trust", value: "FUT" },
  { label: "Individual/Sole Trader", value: "IND" },
  { label: "Other Incorporated Entity", value: "OIE" },
  { label: "Other Partnership", value: "PTR" },
  { label: "Other Unincorporated Entity", value: "UIE" },
  { label: "Other trust", value: "TRT" },
  { label: "Strata-title", value: "STR" }
];

export const columnHeaders = [
  { key: "abn", label: "ABN" },
  { key: "name", label: "Name" },
  { key: "entityType", label: "Entity Type" },
  { key: "status", label: "Status" },
  { key: "recordLastUpdatedDate", label: "Last Updated" },
  { key: "state", label: "State" },
  { key: "postcode", label: "Postcode" },
  { key: "statusFromDate", label: "Status Date" },
  { key: "gstStatus", label: "GST Status" },
];
