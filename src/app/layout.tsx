// React
import React from 'react';
// Metadata
import type { Metadata } from 'next';
// Font
import localFont from 'next/font/local';
// Script
import Script from 'next/script';
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
      <body className={styles.body}>
        {children}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`}
          strategy={'beforeInteractive'}
        />
      </body>
    </html>
  );
}
