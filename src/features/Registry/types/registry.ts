export interface IRecord {
  abn: string;
  status: string;
  statusFromDate: number;
  entityType: {
    ind: string;
    text: string;
  };
  name: string;
  state: string;
  postcode: string;
  gstStatus: string;
  recordLastUpdatedDate: number;
}
