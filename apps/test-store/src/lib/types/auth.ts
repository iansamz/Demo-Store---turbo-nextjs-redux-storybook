export interface LoginResponse {
  token: string;
  userId: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}
