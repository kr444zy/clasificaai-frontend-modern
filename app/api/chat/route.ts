import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: { role: string; content: string }[] = body?.messages || [];
  const last = messages[messages.length - 1]?.content || "";

  // Very simple mock "AI" for local demo.
  // It will reply with a suggested HS framing based on keywords.
  let reply = "Puedo ayudarte a clasificar tu mercadería. Contame más detalles (material, uso, presentación, si es parte o artículo completo, etc.).";

  const lc = last.toLowerCase();
  if (lc.includes("mueble") || lc.includes("armario") || lc.includes("placard")) {
    reply = "Por la descripción, suena a mobiliario. Miraría partida 94.03 (muebles y sus partes). Si es de madera y para cocina: 9403.40; dormitorios: 9403.60. Verificar material, uso y si viene armado o en kit.";
  } else if (lc.includes("textil") || lc.includes("remera") || lc.includes("pantalón") || lc.includes("algodón")) {
    reply = "Podría estar en Capítulo 61/62 (prendas). Necesito tejido de punto o no, composición, género (algodón/sintético), y tipo de prenda para afinar la subpartida.";
  } else if (lc.includes("electrón") || lc.includes("placa") || lc.includes("pcb") || lc.includes("módulo")) {
    reply = "Revisaría Capítulo 85 (aparatos eléctricos, electrónicos). Indicá función principal, si es parte, tensión, interfaces, normas. Ej.: 8534 (circuitos impresos) o 8542 (microestructuras).";
  } else if (lc.includes("alimento") || lc.includes("comida") || lc.includes("bebida")) {
    reply = "Para alimentos/bebidas necesito ingredientes, % de azúcar/grasas, presentación y proceso. Ej.: capítulos 19 a 22. Dame más info y propongo NCM/HS más preciso.";
  }

  return NextResponse.json({ reply });
}
