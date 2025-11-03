// src/app/doc/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Editor from "@/components/Editor";
import DeleteDoc from "@/components/DeleteDoc";

export const runtime = "nodejs";

// App Router: searchParams는 Promise일 수 있음
export default async function DocPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.id) ? sp.id[0] : sp.id;
  const id = Number.parseInt((raw ?? "").trim(), 10);

  if (!Number.isFinite(id)) {
    return (
      <main className="p-6">
        <p>id 파싱 실패: "{String(raw)}"</p>
        <Link href="/" className="text-blue-600 underline">← 목록으로</Link>
        <p className="mt-2 text-sm text-gray-500">예: /doc?id=1</p>
      </main>
    );
  }

  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) {
    return (
      <main className="p-6">
        <p>문서를 찾을 수 없습니다. (id={id})</p>
        <Link href="/" className="text-blue-600 underline">← 목록으로</Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <a href="/" className="text-blue-600 underline">← 목록으로</a>
        {/*  여기! 삭제 버튼을 눈에 띄게 */}
        <DeleteDoc id={id} />
      </div>

      <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
      <Editor id={id} initialContent={doc.content} />
    </main>
  );
}