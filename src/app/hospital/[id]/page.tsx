// React
import React from 'react';
// Components
import TopBar from '@/components/TopBar';
// Styles
import styles from './page.module.scss';
// Page
export default function HospitalPage() {
  return (
    <>
      <TopBar type={'BACK'} />
      <main className={styles.main}>병원 정보가 나옵니다</main>
      <div className={styles.footer}>
        <button className={styles.checkIn}>지금 접수하기</button>
      </div>
    </>
  );
}
