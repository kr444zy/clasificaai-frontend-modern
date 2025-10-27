import { ChatMessage } from "@/lib/storage";
import { Bot, User } from "lucide-react";

export default function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={isUser ? "justify-end flex" : "justify-start flex"}>
      <div className={`max-w-[80%] rounded-2xl p-3 mb-3 text-sm ${isUser ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-800"}`}>
        <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          <span>{isUser ? "Vos" : "ClasificaAI"}</span>
        </div>
        <div className="whitespace-pre-wrap">{msg.content}</div>
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="mt-2 border-t pt-2 text-xs opacity-80">
            Adjuntos: {msg.attachments.map(a => a.name).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
