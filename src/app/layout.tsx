// React
import React from 'react';
// Metadata
import type { Metadata } from 'next';
// Font
import localFont from 'next/font/local';
// Styles
import './globals.scss';
import styles from './layout.module.scss';
// Metadata
export const metadata: Metadata = {
  title: 'Dr.Wait',
  description: '-',
};
// Pretendard font
const pretendard = localFont({
  src: '../assets/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '45 920',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className={styles.body}>{children}</body>
    </html>
  );
}
