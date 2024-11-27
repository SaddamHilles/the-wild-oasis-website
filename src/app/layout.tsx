import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ReservationProvider } from '@/context';

const josefin = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description: 'Cabin Hotal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto w-full'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
