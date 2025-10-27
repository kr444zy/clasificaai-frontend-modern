import "./../styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "ClasificaAI",
  description: "Frontend moderno con chat, adjuntos y historial — estilo ChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen grid grid-rows-[auto_1fr]">
            <header className="border-b p-4">
              <div className="container flex items-center justify-between">
                <div className="font-semibold">ClasificaAI</div>
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
