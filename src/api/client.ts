import axios from "axios";

const API_BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.data?.fails) {
      console.error("Validation errors:", error.response.data.fails);
    }
    return Promise.reject(error);
  }
);
