// React
import React from 'react';
import Link from 'next/link';
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
// Types
import { Symptom } from '@/types/symptom';
// Styles
import styles from './page.module.scss';
// Page
export default async function HomePage() {
  const symptoms: Symptom[] = await fetch(
    `${process.env.BACKEND_URL}/api/symptom/names`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .catch(() => null);
  const filteredSymptoms: Symptom[] = symptoms
    ? symptoms.reduce((acc: Symptom[], symptom) => {
        if (acc.some((s) => s.name === symptom.name)) {
          return acc;
        } else {
          return [...acc, symptom];
        }
      }, [])
    : [];
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
        <SectionTitle>🏥 진료과로 병원 찾기</SectionTitle>
        <RowScroll>
          {departments.map((department) => (
            <Link
              key={department.id}
              href={`/search/hospital/department/${department.name}?category=${encodeURIComponent(department.category)}`}
            >
              <DepartmentCard
                name={department.name}
                icon={department.icon}
                color={department.color}
              />
            </Link>
          ))}
        </RowScroll>
        {filteredSymptoms.length > 0 ? (
          <>
            <SectionTitle>📋 증상으로 병원 찾기</SectionTitle>
            <RowScroll>
              {filteredSymptoms.map((symptom) => (
                <Link
                  key={symptom.id}
                  href={`/search/hospital/symptom/${symptom.name}`}
                  className={styles.symptomCard}
                >
                  <div>{symptom.name}</div>
                </Link>
              ))}
            </RowScroll>
          </>
        ) : null}
      </main>
      <TabBar />
    </>
  );
}
