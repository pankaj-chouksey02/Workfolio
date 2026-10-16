import './globals.css';

import AppShell from '../components/AppShell';
import CustomizationProvider from '@/features/customization/CustomizationProvider';

export const metadata = {
  title: 'Atelier',
  description: 'Museum-grade portfolio and commission platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-[#1B1C1A] font-sans flex flex-col antialiased selection:bg-[#C25E3E] selection:text-white">
        <CustomizationProvider>
          <AppShell>{children}</AppShell>
        </CustomizationProvider>
      </body>
    </html>
  );
}
