"use client";

import { useState } from "react";

// Server Action을 prop으로 받아서 사용합니다.
export default function NewDocForm({
  createDoc,
}: {
  createDoc: (formData: FormData) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("blank");

  return (
    <form action={createDoc} className="mb-6 flex gap-2 items-center">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목 입력"
        className="border px-2 py-1 rounded text-black bg-white"
      />
      <select
        name="template"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="border px-2 py-1 rounded text-black bg-white"
      >
          <option value="blank">빈 문서</option>
          <option value="OnlyHandTrap">패 트랩만</option>
          <option value="HandTrapAndBuild">패 트랩 + 선공 견제</option>
        </select>
      <button type="submit" className="border px-3 py-1 rounded">
        새 문서
      </button>
    </form>
  );
}