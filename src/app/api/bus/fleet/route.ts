import { NextResponse } from "next/server";
import { getActiveBusesCount } from "./fetch";
export async function GET() {
  const result = await getActiveBusesCount();
  return NextResponse.json(result);
}