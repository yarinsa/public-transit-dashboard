import { NextResponse } from "next/server";
import flags from "./flags.json";

export async function GET() {
  return NextResponse.json(flags);
}