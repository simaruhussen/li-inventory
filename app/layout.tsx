// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import NavbarContainer from './components/NavbarContainer'; // Import your new NavbarContainer

// Load the Inter font at the module scope
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });

// Define the metadata here as this is a server component
export const metadata: Metadata = {
  title: 'Inventory Management ',
  description: 'Generated by create next app',
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <NavbarContainer /> {/* Use the NavbarContainer here */}
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
