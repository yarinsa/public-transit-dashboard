import { NextResponse } from "next/server";
import { getTrainOnTimeRate } from "@/app/@dashboard/_components/fetch-data";

export async function GET() {
  const result = await getTrainOnTimeRate();
  return NextResponse.json(result);
}