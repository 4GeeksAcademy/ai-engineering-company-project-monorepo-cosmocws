import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexova | Pipeline de candidaturas",
  description: "Herramienta interna de People & Talent de Nexova.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
