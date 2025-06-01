'use client';
// Next.js
import { useRouter } from 'next/navigation';
// Styles
import styles from './index.module.scss';
import Link from 'next/link';
// Props
type Props = {
  title?: string;
  type: 'LOGO' | 'BACK';
};
// Component
export default function TopBar({ title, type = 'LOGO' }: Props) {
  // Navigation
  const router = useRouter();
  // Render
  return (
    <div className={styles.wrapper}>
      {type === 'LOGO' ? (
        <Link href={'/'}>
          {title ? (
            title
          ) : (
            <span className={styles.logo}>
              Dr.Wait<sup>+</sup>
            </span>
          )}
        </Link>
      ) : null}
      {type === 'BACK' ? (
        <div>
          <button
            type={'button'}
            className={styles.back}
            onClick={() => {
              router.back();
            }}
          >
            <i className={`fa-fw fa-light fa-chevron-left`} />
          </button>
        </div>
      ) : null}
      <div className={styles.title}>
        {title ? <span className={styles.title}>{title}</span> : null}
      </div>
      <div>{type === 'LOGO' ? null : null}</div>
    </div>
  );
}
