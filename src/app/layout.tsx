import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CIIRC® | Centre for Incubation, Innovation, Research and Consultancy',
  description:
    'CIIRC® is an autonomous research institution recognized by DSIR-SIRO, Ministry of Science & Technology, Government of India. Joint Initiative of Sri Sringeri Sharada Peetham, Sringeri and Jyothy Institute of Technology (JIT).',
  icons: {
    icon: 'https://ciirc.res.in/site/wp-content/uploads/2021/05/ciirc-favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://ciirc.res.in/site/wp-content/uploads/2021/05/ciirc-favicon.png"
        />
      </head>
      <body style={{ backgroundColor: 'var(--paper)', color: 'var(--forest)', position: 'relative', minHeight: '100vh' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
