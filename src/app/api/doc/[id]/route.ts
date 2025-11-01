import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const doc = await prisma.document.findUnique({ where: { id: Number(id) } });
  if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { content } = await req.json();
  const doc = await prisma.document.update({
    where: { id: Number(id) },
    data: { content: String(content ?? "") },
  });
  return NextResponse.json(doc);
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await prisma.document.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}