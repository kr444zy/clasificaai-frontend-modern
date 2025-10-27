"use client";

import { useState } from "react";
import FileDropzone from "./FileDropzone";
import { AttachmentMeta } from "@/lib/storage";
import { SendHorizonal } from "lucide-react";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string, attachments: AttachmentMeta[]) => void;
}) {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;
    onSend(trimmed, attachments);
    setText("");
    setAttachments([]);
  }

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describí la mercadería a clasificar o hablá con la IA…"
        className="w-full rounded-2xl border p-3 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 bg-transparent"
      />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
        <FileDropzone onFiles={(files) => setAttachments((prev) => [...prev, ...files])} />
        <button
          onClick={handleSend}
          className="rounded-2xl border px-4 py-3 text-sm hover:shadow-soft transition flex items-center justify-center gap-2"
        >
          <SendHorizonal className="w-4 h-4" />
          Enviar
        </button>
      </div>
      {attachments.length > 0 && (
        <div className="text-xs opacity-80">
          {attachments.length} archivo(s) adjunto(s) listo(s) para enviar.
        </div>
      )}
    </div>
  );
}
