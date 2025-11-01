import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.document.delete({ where: { id: Number(id) } });
  return NextResponse.redirect(new URL("/", request.url));
}