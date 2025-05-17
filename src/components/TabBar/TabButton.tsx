'use client';
// Imports
import Link from 'next/link';
// Navigation
import { usePathname } from 'next/navigation';
// Styles
import styles from './TabButton.module.scss';
// Props
type Props = { text: string; icon: string; href: string };
// Component
export default function TabButton({ text, icon, href }: Props) {
  // Navigation
  const pathname = usePathname();
  // Render
  return (
    <li role={'presentation'} className={styles.wrapper}>
      <Link role={'tab'} href={href} className={styles.tab}>
        <i
          className={`${styles.icon} ${icon} ${pathname === href ? 'fa-solid' : 'fa-regular'}`}
        ></i>
        <span className={styles.text}>{text}</span>
      </Link>
    </li>
  );
}
