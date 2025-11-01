"use client";

import React, { useCallback } from "react";

export default function DeleteDoc({ id }: { id: number }) {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("정말 삭제하시겠습니까?")) e.preventDefault();
  }, []);

  return (
    <form action={`/api/doc/${id}/delete`} method="post" onSubmit={onSubmit}>
      <button
        type="submit"
        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        aria-label="문서 삭제"
      >
        삭제
      </button>
    </form>
  );
}