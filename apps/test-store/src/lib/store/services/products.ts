import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductRequest } from "@lib/types";
import { API_BASE_URL, ENDPOINTS } from "@lib/constants";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      query: (id) => ENDPOINTS.PRODUCT(id),
    }),
    getProducts: builder.query<Product[], ProductRequest>({
      query: ({ category, limit }) => ({
        url: ENDPOINTS.PRODUCTS({ category }),
        params: { limit },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
