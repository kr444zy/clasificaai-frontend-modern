"use client";

import { ChatThread } from "@/lib/storage";
import { Plus } from "lucide-react";

export default function Sidebar({
  threads,
  currentId,
  onSelect,
  onNew,
}: {
  threads: ChatThread[];
  currentId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <aside className="w-full md:w-72 border-r h-full flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-semibold">Chats</h2>
        <button
          onClick={onNew}
          className="rounded-xl border px-3 py-2 text-xs hover:shadow-soft transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nuevo
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {threads.length === 0 && (
          <div className="text-xs opacity-70 p-3">No hay chats todavía</div>
        )}
        {threads.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`w-full text-left rounded-xl px-3 py-2 text-sm hover:shadow-soft transition ${currentId === t.id ? "border" : "border border-transparent"}`}
          >
            <div className="font-medium line-clamp-1">{t.title || "Chat sin título"}</div>
            <div className="text-xs opacity-70">
              {new Date(t.updatedAt).toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
