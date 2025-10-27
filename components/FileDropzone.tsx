"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Paperclip } from "lucide-react";
import { AttachmentMeta } from "@/lib/storage";

export default function FileDropzone({
  onFiles,
}: {
  onFiles: (files: AttachmentMeta[]) => void;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const metas: AttachmentMeta[] = acceptedFiles.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      type: f.type || "application/octet-stream",
    }));
    onFiles(metas);
  }, [onFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed rounded-2xl p-4 text-sm flex items-center justify-center gap-2 cursor-pointer hover:shadow-soft transition h-24"
    >
      <input {...getInputProps()} />
      <Paperclip className="w-4 h-4" />
      {isDragActive ? (
        <span>Soltá los archivos aquí…</span>
      ) : (
        <span>Adjuntar PPT, Excel, PDF, fotos, videos…</span>
      )}
    </div>
  );
}
