import { apiClient } from "./client";
import type {
  UsersResponse,
  PositionsResponse,
  RegistrationRequest,
  RegistrationResponse,
  TokenResponse,
} from "./types";

export const usersApi = {
  // Get users with pagination
  getUsers: async (
    page: number = 1,
    count: number = 6
  ): Promise<UsersResponse> => {
    const response = await apiClient.get("/users", {
      params: { page, count },
    });
    return response.data;
  },

  // Get all available positions
  getPositions: async (): Promise<PositionsResponse> => {
    const response = await apiClient.get("/positions");
    return response.data;
  },

  // Get token for registration
  getToken: async (): Promise<TokenResponse> => {
    const response = await apiClient.get("/token");
    return response.data;
  },

  // Register new user
  registerUser: async (
    userData: RegistrationRequest
  ): Promise<RegistrationResponse> => {
    // First, get a token
    const tokenResponse = await usersApi.getToken();
    const token = tokenResponse.token;

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("position_id", userData.position_id);
    formData.append("photo", userData.photo);

    const response = await apiClient.post("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: token,
      },
    });
    return response.data;
  },
};
