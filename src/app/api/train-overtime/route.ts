import { NextResponse } from "next/server";
import { getTrainPunctualityRate } from "./fetch";
export async function GET() {
  const result = await getTrainPunctualityRate();
  return NextResponse.json(result);
}