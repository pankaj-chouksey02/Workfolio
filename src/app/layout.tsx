import './globals.css';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'Atelier',
  description: 'Museum-grade portfolio and commission platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-[#1B1C1A] font-sans flex flex-col antialiased selection:bg-[#C25E3E] selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
