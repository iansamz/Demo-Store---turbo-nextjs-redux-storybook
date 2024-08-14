import type { ProductRequest } from "./types";

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://fakestoreapi.com";

export const ENDPOINTS = {
  PRODUCT: (id: number) => `/products/${id}`,
  PRODUCTS: ({ category, limit }: ProductRequest) =>
    `/products${category ? `/category/${category}` : ""}${
      limit ? `?limit=${limit}` : ""
    }`,
  CATEGORIES: `${API_BASE_URL}/products/categories`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  USER: (userId: number) => `${API_BASE_URL}/users/${userId}`,
};

export const INCORRECT_EMAIL_OR_PASSWORD =
  "Incorrect email or password provided.";
export const SERVER_ERROR =
  "There was a problem signing you in, please try again later.";
