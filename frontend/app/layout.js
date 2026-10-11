import "./globals.css";

export const metadata = {
  title: "Giro na Moto — encontre sua próxima moto",
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
