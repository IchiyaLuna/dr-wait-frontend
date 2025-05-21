// React
import React from 'react';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}>;
// Component
export default function RowScroll({ children, className, style }: Props) {
  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div>
  );
}
