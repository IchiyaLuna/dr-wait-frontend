// React
import React from 'react';
// Components
import TopBar from '@/components/TopBar';
// Styles
import styles from './page.module.scss';
import { Hospital } from '@/types/hospital';
import Card from '@/components/Card';
// Page
export default async function HospitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: Hospital = await fetch(
    `${process.env.BACKEND_URL}/api/hospital/${id}`
  )
    .then((res) => res.json())
    .catch(() => null);

  console.log(data);

  return (
    <>
      <TopBar type={'BACK'} />
      <main className={styles.main}>
        {data ? (
          <div className={styles.hospitalInfo}>
            <p className={styles.hospitalDepartment}>{data.department}</p>
            <h1 className={styles.hospitalName}>{data.name}</h1>
            <p className={styles.hospitalAddress}>{data.address}</p>
            <p className={styles.hospitalTelephone}>{data.telephone}</p>
          </div>
        ) : (
          <div className={styles.error}>
            병원 정보를 불러오는 데 실패했습니다.
          </div>
        )}
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
