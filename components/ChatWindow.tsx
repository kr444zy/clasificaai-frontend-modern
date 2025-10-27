"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { ChatMessage, ChatThread, loadThreads, saveThreads } from "@/lib/storage";

export default function ChatWindow() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setThreads(loadThreads());
  }, []);

  useEffect(() => {
    if (threads.length > 0 && !activeId) setActiveId(threads[0].id);
  }, [threads]);

  const active = useMemo(
    () => threads.find((t) => t.id === activeId),
    [threads, activeId]
  );

  function persist(next: ChatThread[]) {
    setThreads(next);
    saveThreads(next);
  }

  function newThread() {
    const id = uuidv4();
    const now = Date.now();
    const thread: ChatThread = { id, title: "Nuevo chat", messages: [], createdAt: now, updatedAt: now };
    const next = [thread, ...threads];
    persist(next);
    setActiveId(id);
  }

  function setActive(id: string) {
    setActiveId(id);
  }

  async function handleSend(text: string, attachments: any[]) {
    if (!active) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: text,
      attachments,
      createdAt: Date.now(),
    };

    const updated: ChatThread = {
      ...active,
      title: active.messages.length === 0 ? (text || "Nuevo chat") : active.title,
      messages: [...active.messages, userMsg],
      updatedAt: Date.now(),
    };
    const nextThreads = threads.map((t) => (t.id === active.id ? updated : t));
    persist(nextThreads);

    // Call mock API for now
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updated.messages.map(({ role, content }) => ({ role, content })),
      }),
    });
    const data = await res.json();

    const assistantMsg: ChatMessage = {
      id: uuidv4(),
      role: "assistant",
      content: data.reply,
      createdAt: Date.now(),
    };

    const updated2: ChatThread = {
      ...updated,
      messages: [...updated.messages, assistantMsg],
      updatedAt: Date.now(),
    };
    const next2 = threads.map((t) => (t.id === active.id ? updated2 : t));
    persist(next2);
  }

  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="overflow-y-auto p-4">
        {active?.messages.length ? (
          active.messages.map((m) => <MessageBubble key={m.id} msg={m} />)
        ) : (
          <div className="h-full flex items-center justify-center text-center opacity-70">
            <div>
              <h3 className="text-xl font-semibold mb-2">¡Bienvenido a ClasificaAI!</h3>
              <p>Describí tu mercadería para sugerencias de clasificación HS y asesoramiento.</p>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={handleSend} />
        <div className="text-[11px] opacity-60 mt-2">
          * Demo local — adjuntos listados pero no se suben al servidor. Integra un almacenamiento (S3, Cloud Storage) si necesitás persistirlos.
        </div>
      </div>
    </div>
  );
}
