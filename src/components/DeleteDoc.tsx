"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function DeleteDoc({ id }: { id: number }) {
  const router = useRouter();
  const onClick = useCallback(async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const res = await fetch(`/api/doc/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/");
    } else {
      alert("삭제에 실패했습니다.");
    }
  }, [id, router]);

  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
      aria-label="문서 삭제"
    >
      삭제
    </button>
  );
}