import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import NewDocForm from "@/components/NewDocForm";

export const revalidate = 0;

// ✅ 템플릿 사전
const TEMPLATES: Record<string, (title: string) => string> = {
  blank: () => "",
  OnlyHandTrap: (title) => `
    <h1>${title || "덱 이름"}</h1>
    <p>하루 우라라: </p>
    <p>도미나스 임펄스: </p>
    <p>무효계(뵐포): </p>
    <p>유령토끼: </p>
    <p>도미나스 퍼지: </p>
    <p>비스테드: </p>
    <p>D.D. 크로우: </p>
    <p>원시생명체 니비루: </p>
  `,
  HandTrapAndBuild: (title) => `
    <h1>${title || "덱 이름"}</h1>
    <h2>패 트랩</h2>
    <p>하루 우라라: </p>
    <p>도미나스 임펄스: </p>
    <p>무효계(뵐포): </p>
    <p>유령토끼: </p>
    <p>도미나스 퍼지: </p>
    <p>비스테드: </p>
    <p>원시생명체 니비루: </p>
    <p>D.D. 크로우: </p>
    <h2>선공 견제</h2>
    <p>소환 무효계: </p>
    <p>파괴 견제: </p>
    <p>몬스터 퍼미션: </p>
    <p>비파괴 견제: </p>
    <p>만능 퍼미션: </p>
    <p>(소환 무효 x)카함 만능 퍼미션: </p>
  `,
};

// ✅ 서버 액션: 문서 생성
async function createDoc(formData: FormData) {
  "use server";
  const title = (formData.get("title") as string)?.trim() || "제목 없는 문서";
  const tpl = (formData.get("template") as string) || "blank";

  const contentFactory = TEMPLATES[tpl] ?? TEMPLATES.blank;
  const html = contentFactory(title);

  const doc = await prisma.document.create({
    data: { title, content: html },
  });

  redirect(`/doc?id=${doc.id}`);
}

export default async function HomePage() {
  const docs = await prisma.document.findMany({
    select: { id: true, title: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main style={{ padding: 16 }}>
      <h1 className="text-xl font-semibold mb-3">문서 목록</h1>

      {/*  클라이언트 폼(입력 잘 됨) */}
      <NewDocForm createDoc={createDoc} />

      <ul className="space-y-2">
        {docs.map((d: { id: number; title: string; updatedAt: Date }) => (
          <li key={d.id} className="flex items-center gap-3">
            <span className="text-sm text-gray-400">#{d.id}</span>
            <span className="font-medium">{d.title}</span>
            <Link
              href={`/doc?id=${encodeURIComponent(String(d.id))}`}
              className="text-blue-600 underline"
              prefetch={false}
            >
              열기
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}