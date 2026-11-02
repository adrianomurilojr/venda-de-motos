import "./globals.css";

export const metadata = {
  title: "Encontre sua moto aqui — marketplace de motos",
  description:
    "Um lugar simples para encontrar sua próxima moto ou anunciar a que está na garagem.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
