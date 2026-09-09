import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CIIRC® | Research is a Living System',
  description:
    'Centre for Incubation, Innovation, Research and Consultancy (CIIRC®). Scientific and Industrial Research Organization (SIRO) recognized by DSIR, Ministry of Science & Technology, GoI.',
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
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://ciirc.res.in/site/wp-content/uploads/2021/05/ciirc-favicon.png"
        />
      </head>
      <body style={{ backgroundColor: 'var(--paper)', position: 'relative', minHeight: '100vh', color: 'var(--ink)' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
