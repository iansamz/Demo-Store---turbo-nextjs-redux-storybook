import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  User,
  TokenResponse,
} from "@lib/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === "undefined"
        ? "http://localhost:3000"
        : window.location.origin,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: { username, password },
      }),
    }),
    getAuthData: builder.query<User, TokenResponse>({
      query: ({ token }) => ({
        url: `/api/auth/user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAuthDataQuery } = authApi;
