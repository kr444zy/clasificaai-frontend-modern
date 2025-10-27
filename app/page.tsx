"use client";

import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useEffect, useState } from "react";
import { ChatThread, loadThreads } from "@/lib/storage";

export default function Page() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [current, setCurrent] = useState<string | undefined>(undefined);

  useEffect(() => {
    const t = loadThreads();
    setThreads(t);
    if (t.length) setCurrent(t[0].id);
  }, []);

  function refresh() {
    const t = loadThreads();
    setThreads(t);
    if (!current && t.length) setCurrent(t[0].id);
  }

  return (
    <main className="container py-4 h-[calc(100vh-65px)]">
      <div className="grid md:grid-cols-[280px_1fr] gap-4 h-full">
        <Sidebar
          threads={threads}
          currentId={current}
          onSelect={(id) => setCurrent(id)}
          onNew={() => {
            // Create a new empty thread by toggling ChatWindow
            localStorage.setItem("clasificaai:threads", JSON.stringify([
              {
                id: crypto.randomUUID(),
                title: "Nuevo chat",
                messages: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
              },
              ...threads
            ]));
            refresh();
          }}
        />
        <section className="rounded-2xl border h-full overflow-hidden">
          <ChatWindow />
        </section>
      </div>
    </main>
  );
}
