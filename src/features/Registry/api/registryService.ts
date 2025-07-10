import axiosInstance from "../../../axios/Axios";

export type AbnFilterParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string[];
  state?: string[];
  gstStatus?: string[];
  entityType?: string[];
};

export const fetchRecords = async (filters: AbnFilterParams) => {
  try {
    const response = await axiosInstance.post("/abn-records", filters);
    return response;
  } catch (error) {
    console.error("Error fetching ABN records:", error);
    throw error;
  }
};
