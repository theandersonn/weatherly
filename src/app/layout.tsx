import { Providers } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weatherly',
  description: 'Confira a previsão do tempo com estilo e precisão.',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
