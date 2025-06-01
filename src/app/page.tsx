// React
import React from 'react';
// Auth.js
import { useSession } from 'next-auth/react';
// Components
import TopBar from '@/components/TopBar';
import ProfileCard from '@/components/ProfileCard';
import Row from '@/components/Row';
import Card from '@/components/Card';
import Column from '@/components/Column';
import SectionTitle from '@/components/SectionTitle';
import RowScroll from '@/components/RowScroll';
import DepartmentCard from '@/components/DepartmentCard';
import TabBar from '@/components/TabBar';
// Data
import { departments } from '@/data/departments';
// Styles
import styles from './page.module.scss';
import Link from 'next/link';
// Page
export default function HomePage() {
  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        <ProfileCard />
        <Row>
          <Column>
            <Link href="/search/hospital/list" className={styles.link}>
              <Card className={styles.bigCard}>
                <div className={styles.header}>
                  <h3>병원 찾기</h3>
                  <p>지금 바로 접수하기</p>
                </div>
                <div className={styles.footer}>
                  <i className={`fa-duotone fa-fw fa-hospitals`} />
                </div>
              </Card>
            </Link>
          </Column>
          <Column>
            <Link href={'/reservation'} className={styles.link}>
              <Card className={styles.smallCard}>
                <div className={styles.header}>
                  <h3>진료 기록</h3>
                </div>
                <div className={styles.footer}>
                  <i className={`fa-duotone fa-fw fa-files-medical`} />
                </div>
              </Card>
            </Link>
            <Link href="/search/pharmacy" className={styles.link}>
              <Card className={styles.smallCard}>
                <div className={styles.header}>
                  <h3>약국 찾기</h3>
                </div>
                <div className={styles.footer}>
                  <i
                    className={`fa-duotone fa-fw fa-prescription-bottle-medical`}
                  />
                </div>
              </Card>
            </Link>
          </Column>
        </Row>
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
      </main>
      <TabBar />
    </>
  );
}
