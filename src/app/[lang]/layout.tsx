import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { getDictionary, Locale } from './dictionaries';

const josefin = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description: 'Cabin Hotal',
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dict = await getDictionary(lang);

  return (
    <html lang='en'>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
      >
        <Header cabinTexts={dict.cabins} />
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto w-full'>{children}</main>
        </div>
      </body>
    </html>
  );
}
