// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
}>;
// Component
export default function Column({ children }: Props) {
  return <div className={styles.column}>{children}</div>;
}
