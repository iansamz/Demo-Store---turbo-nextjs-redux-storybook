"use client";

import { SectionWrapper } from "@repo/ui/components/section-wrapper";
import { useGetAuthDataQuery } from "@lib/store/services/auth";
import { useAppSelector } from "@lib/store/hooks";
import { selectAuth } from "@lib/store/slices/auth-slice";

export default function ProfilePage(): JSX.Element {
  const { token } = useAppSelector(selectAuth);

  const { data, error, isLoading } = useGetAuthDataQuery({
    token: token || "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error Occured</div>;
  }

  return (
    <SectionWrapper>
      <h1 className="text-2xl">Profile Page(Protected)</h1>
      <p>Email: {data.email}</p>
      <p>Username: {data.username}</p>
      <p>Name: {`${data.name.firstname} ${data.name.lastname}`}</p>
      <p>Phone: {data.phone}</p>
      <p>Address: {`${data.address.street}, ${data.address.city}`}</p>
    </SectionWrapper>
  );
}
