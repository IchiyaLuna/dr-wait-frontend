// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
}>;
// Component
export default function Row({ children }: Props) {
  return <div className={styles.row}>{children}</div>;
}
