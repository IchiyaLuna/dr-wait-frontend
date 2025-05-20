// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
}>;
// Component
export default function Card({ children }: Props) {
  return <div className={styles.card}>{children}</div>;
}
