// React
import React from 'react';
// Components
import TopBar from '@/components/TopBar';
import ProfileCard from '@/components/ProfileCard';
import Row from '@/components/Row';
import Card from '@/components/Card';
import SectionTitle from '@/components/SectionTitle';
import RowScroll from '@/components/RowScroll';
import DepartmentCard from '@/components/DepartmentCard';
import TabBar from '@/components/TabBar';
// Data
import { departments } from '@/data/departments';
// Styles
import styles from './page.module.scss';
// Page
export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <ProfileCard />
        <Row>
          <Card>동네 인기 병원 🔥</Card>
          <Card>지금 문연 병원 🛋️</Card>
        </Row>
        {/* search */}
        <SectionTitle>🏥 진료과로 병원 찾기</SectionTitle>
        <RowScroll>
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              name={department.name}
              icon={department.icon}
              color={department.color}
            />
          ))}
        </RowScroll>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
        <div className={styles.component}>MyPage</div>
      </main>
      <TabBar />
    </>
  );
}
