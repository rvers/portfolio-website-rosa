import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Research Portfolio',
  description: 'Portfolio showcasing academic research projects and publications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container">
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="container">
            <p>&copy; 2024 Research Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
