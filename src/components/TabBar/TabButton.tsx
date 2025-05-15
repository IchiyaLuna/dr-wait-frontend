// Imports
import Link from 'next/link';
// Styles
import styles from './TabButton.module.scss';
// Props
type Props = { text: string; icon: string; href: string };
// Component
export default function TabButton({ text, icon, href }: Props) {
  return (
    <Link role={'tab'} href={href} className={styles.tab}>
      <i className={`${styles.icon} ${icon}`}></i>
      <span className={styles.text}>{text}</span>
    </Link>
  );
}
