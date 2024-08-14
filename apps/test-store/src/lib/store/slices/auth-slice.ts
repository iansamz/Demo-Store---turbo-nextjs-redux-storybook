import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { LoginResponse } from "@lib/types";
import { authApi } from "@lib/store/services/auth";
import { AUTH_TOKEN, removeCookies, setAuthCookie } from "@lib/cookies";

const initialState: Partial<LoginResponse> = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      removeCookies([AUTH_TOKEN]);
      toast.info("You have been logged out");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (_state, action: PayloadAction<LoginResponse>) => {
        setAuthCookie(action.payload.token, AUTH_TOKEN);

        return action.payload;
      },
    );
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export const selectAuth = (state: { auth: Partial<LoginResponse> }) =>
  state.auth;

export default authSlice.reducer;
