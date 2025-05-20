// React
import React from 'react';
// Components
import TopBar from '@/components/TopBar';
import ProfileCard from '@/components/ProfileCard';
import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
import Card from '@/components/Card';
import SectionTitle from '@/components/SectionTitle';
import RowScroll from '@/components/RowScroll';
import Row from '@/components/Row';
// Data
const departments = [
  {
    name: '소아청소년과',
    icon: 'fa-baby',
    bgColor: 'bg-yellow-100',
  },
  {
    name: '가정의학과',
    icon: 'fa-house-chimney-medical',
    bgColor: 'bg-lime-100',
  },
  { name: '산부인과', icon: 'fa-person-dress', bgColor: 'bg-pink-100' },
  { name: '내과', icon: 'fa-stethoscope', bgColor: 'bg-red-100' },
  { name: '정형외과', icon: 'fa-bone', bgColor: 'bg-green-100' },
  {
    name: '피부과',
    icon: 'fa-hand-dots',
    bgColor: 'bg-orange-100',
  },
  { name: '안과', icon: 'fa-eye', bgColor: 'bg-blue-100' },
];
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
          <div className={styles.tempCard}>abc</div>
          <div className={styles.tempCard}>abc</div>
          <div className={styles.tempCard}>abc</div>
          <div className={styles.tempCard}>abc</div>
          <div className={styles.tempCard}>abc</div>
        </RowScroll>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {departments.map((dept, index) => (
            <div
              key={index}
              className={`min-w-[120px] rounded-2xl p-4 ${dept.bgColor} flex items-center justify-center flex-col gap-2 shadow-sm`}
            >
              <div className="text-2xl">
                <i className={`fa-solid ${dept.icon}`} />
              </div>
              <div className="text-sm font-medium text-center">{dept.name}</div>
            </div>
          ))}
        </div>
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
