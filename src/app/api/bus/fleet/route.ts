import { NextResponse } from "next/server";
import { getActiveBusesCount } from "./fetch";
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000 * 60));
  return NextResponse.json({
    status: "success",
    data: {
      activeBuses: 10,
    },
  });
  const result = await getActiveBusesCount();
  return NextResponse.json(result);
}