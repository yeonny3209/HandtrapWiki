import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await prisma.document.delete({ where: { id: Number(id) } });
  return NextResponse.redirect(new URL("/", req.url));
}