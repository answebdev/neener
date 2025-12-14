import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Import components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Load Google fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Site-wide metadata
export const metadata = {
  // This ensures that Open Graph card images get a proper absolute URL:
  metadataBase: new URL('https://nihilcollective.vercel.app'),
  title: 'NX3',
  description: 'NX3 Label Website',
  icons: {
    icon: '/favicon.ico',
  },
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
