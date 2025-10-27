# ClasificaAI — Frontend moderno (Next.js 14)

Frontend estilo ChatGPT con:
- Chat IA (demo local) para clasificación arancelaria (HS).
- Adjuntos múltiples (PPT, Excel, PDF, imágenes, videos — listados en el chat).
- Historial de chats (localStorage).
- Modo claro/oscuro.
- UI moderna con Tailwind.

> **Nota:** La ruta `/api/chat` es un *mock* local que genera respuestas simples. Podés integrar tu backend/LLM reemplazando ese endpoint.

## Requisitos
- Node.js 18+ recomendado

## Uso
```bash
npm install
npm run dev
# abrir http://localhost:3000
```

## Build producción
```bash
npm run build
npm start
```

## Integración con IA real
- Reemplazá `app/api/chat/route.ts` con una llamada a tu backend o a la API de tu proveedor LLM.
- Manejá subida de adjuntos con un storage (S3, GCS) y guardá metadatos.

## Licencia
MIT
