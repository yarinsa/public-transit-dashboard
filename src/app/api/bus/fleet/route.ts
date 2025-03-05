import { NextResponse } from "next/server";
import { getTrainOnTimeRate } from "./fetch";
export async function GET() {
  const result = await getTrainOnTimeRate();
  return NextResponse.json(result);
}