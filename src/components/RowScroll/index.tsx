// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
}>;
// Component
export default function RowScroll({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>;
}
