import React from "react";
import { AuthWrapper } from "@components/auth-wrapper";

interface PageElementProps {
  children: React.ReactNode;
}

export default function ProfileLayout({
  children,
}: PageElementProps): JSX.Element {
  return <AuthWrapper>{children}</AuthWrapper>;
}
