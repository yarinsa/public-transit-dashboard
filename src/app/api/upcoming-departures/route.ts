import { NextResponse } from "next/server";
import { getUpcomingDepartures } from "./fetch";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit');
  const result = await getUpcomingDepartures({limit});
  return NextResponse.json(result);
}