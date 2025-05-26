'use client';
// Next.js
import { useRouter } from 'next/navigation';
// Styles
import styles from './index.module.scss';
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
        <div>
          {title ? (
            title
          ) : (
            <span className={styles.logo}>
              Dr.Wait<sup>+</sup>
            </span>
          )}
        </div>
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
            <i className={`fa-fw fa-regular fa-chevron-left`} />
          </button>
        </div>
      ) : null}
      {type === 'LOGO' ? (
        <div>
          <i className="fa-solid fa-bars"></i>
        </div>
      ) : null}
    </div>
  );
}
