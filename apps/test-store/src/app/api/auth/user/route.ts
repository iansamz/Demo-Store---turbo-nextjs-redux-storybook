import { NextResponse } from "next/server";
import type { User } from "@lib/types";
import { ENDPOINTS, SERVER_ERROR } from "@lib/constants";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
        statusText: "Unauthorized",
      });
    }

    // if we were using the token to get the user data this is how it would look
    // const response = await fetch(ENDPOINTS.USER, {
    //   headers: {
    //     Authorization: token,
    //   },
    // });

    const response = await fetch(ENDPOINTS.USER(2));
    const user = (await response.json()) as User;
    return NextResponse.json<User>(user);
  } catch (e) {
    return NextResponse.json({
      error: SERVER_ERROR,
      status: 500,
    });
  }
}
