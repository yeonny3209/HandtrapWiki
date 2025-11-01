"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";

export default function Editor({ id, initialContent }: { id: number; initialContent: string }) {
  const didInit = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit, // Heading/Paragraph/Bold 등 포함
      Placeholder.configure({ placeholder: "여기에 내용을 입력하세요..." }),
    ],
    content: "",                 // 초기엔 비워두고
    immediatelyRender: false,    // SSR 하이드레이션 이슈 방지
    onUpdate: ({ editor }) => {
      save(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && !didInit.current) {
      editor.commands.setContent(initialContent || "", { emitUpdate: false }); // ✅ HTML 삽입
      didInit.current = true;
    }
  }, [editor, initialContent]);

  async function save(content: string) {
    await fetch(`/api/doc/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
  }

  if (!editor) return null;

  return (
    <div className="prose prose-neutral max-w-none bg-white text-black p-4 rounded border">
      <EditorContent editor={editor} />
    </div>
  );
}