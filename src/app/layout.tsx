import type { Metadata } from 'next';
import '../globals.css';

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
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://ciirc.res.in/site/wp-content/uploads/2021/05/ciirc-favicon.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;650;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)', position: 'relative', minHeight: '100vh' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
