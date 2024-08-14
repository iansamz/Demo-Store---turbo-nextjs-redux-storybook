import { NextResponse } from "next/server";
import type { LoginRequest, LoginResponse, TokenResponse } from "@lib/types";
import {
  ENDPOINTS,
  INCORRECT_EMAIL_OR_PASSWORD,
  SERVER_ERROR,
} from "@lib/constants";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginRequest;
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401 || response.statusText === "Unauthorized") {
      return NextResponse.json({
        error: INCORRECT_EMAIL_OR_PASSWORD,
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const tokenResponse = (await response.json()) as TokenResponse;

    return NextResponse.json<LoginResponse>({
      token: tokenResponse.token,
      userId: 2,
    });
  } catch (e) {
    return NextResponse.json({
      error: SERVER_ERROR,
      status: 500,
    });
  }
}
