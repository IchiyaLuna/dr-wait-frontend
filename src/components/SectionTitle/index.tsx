// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
}>;
// Component
export default function SectionTitle({ children }: Props) {
  return <h2 className={styles.title}>{children}</h2>;
}
