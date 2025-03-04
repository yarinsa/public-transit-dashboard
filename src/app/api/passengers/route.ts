import { NextResponse } from "next/server";
import { getDailyRiders } from "./fetch";
export async function GET() {
  const result = await getDailyRiders();
  return NextResponse.json(result);
}