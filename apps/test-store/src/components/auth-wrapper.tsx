"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@lib/store/hooks";
import { getValidAuthToken } from "@lib/cookies";
import { logout, selectAuth } from "@lib/store/slices/auth-slice";
import { useGetAuthDataQuery } from "@lib/store/services/auth";

interface AuthWrapperProps {
  children?: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userId } = useAppSelector(selectAuth);

  const token = getValidAuthToken();

  const { error, isLoading } = useGetAuthDataQuery(
    { token: token || "" },
    {
      skip: Boolean(userId) || !token,
    },
  );

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.push("/auth/login");
    }
  }, [token, dispatch, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error loading your data</div>;
  }

  return children;
};
