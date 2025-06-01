// React
import React from 'react';
// Components
import TopBar from '@/components/TopBar';
import Card from '@/components/Card';
// Styles
import styles from './page.module.scss';
// Page
export default function HospitalReservationPage() {
  return (
    <>
      <TopBar type={'BACK'} />
      <main className={styles.main}>
        <Card>
          <h2>진료대상 선택</h2>
          <div>
            <Card>유저1</Card>
            <Card>유저2</Card>
          </div>
        </Card>
        <Card>진료항목 선택</Card>
        <Card>증상 설명</Card>
      </main>
      <div className={styles.footer}>
        <button className={styles.checkIn}>진료 접수하기</button>
      </div>
    </>
  );
}
