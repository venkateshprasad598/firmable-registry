import axiosInstance from "../../../axios/Axios";

export type FilterPayload = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string[];
  state?: string[];
  gstStatus?: string[];
  entityType?: string[];
};

export const fetchRecords = async (filters: FilterPayload) => {
  try {
    const response = await axiosInstance.post("/registry-records", filters);
    return response;
  } catch (error) {
    console.error("Error fetching ABN records:", error);
    throw error;
  }
};

export const exportRecords = async (filters: FilterPayload) => {
  try {
    const response = await axiosInstance.post("/export-records", filters);
    return response;
  } catch (error) {
    console.error("Error fetching ABN records:", error);
    throw error;
  }
};
