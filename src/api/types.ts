export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface UsersResponse {
  success: boolean;
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: User[];
}

export interface PositionsResponse {
  success: boolean;
  positions: Position[];
}

export interface RegistrationRequest {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  photo: File;
}

export interface RegistrationResponse {
  success: boolean;
  user_id: string;
  message: string;
}

export interface TokenResponse {
  success: boolean;
  token: string;
}
