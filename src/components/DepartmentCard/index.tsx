// React
import React from 'react';
// Components
import Card from '@/components/Card';
// Styles
import styles from './index.module.scss';
// Props
type Props = Readonly<{
  name: string;
  icon: string;
  color: string;
}>;
// Component
export default function DepartmentCard({ name, icon, color }: Props) {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <i
          className={`fa-duotone fa-fw ${icon} ${styles.icon}`}
          style={{ color: `var(${color})` }}
        />
      </Card>
      <span className={styles.name}>{name}</span>
    </div>
  );
}
