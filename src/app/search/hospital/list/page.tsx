import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
import TopBar from '@/components/TopBar';
import { Hospital } from '@/types/hospital';
import Link from 'next/link';
import Card from '@/components/Card';
// Page
export default async function SearchHospitalListPage() {
  const data: Hospital[] = await fetch(
    `${process.env.BACKEND_URL}/api/hospital/list`
  )
    .then((res) => res.json())
    .catch(() => null);

  console.log(data);

  return (
    <>
      <TopBar type={'BACK'} title={'병원 목록'} />
      <main className={styles.main}>
        <div>닥터웨잇 접수를 지원하는 병원 목록입니다.</div>
        {data ? (
          data.map((hospital: Hospital) => (
            <Link key={hospital.id} href={`/hospital/${hospital.id}`}>
              <Card className={styles.hospitalCard}>
                <div>
                  <h3>{hospital.name}</h3>
                  <p>{hospital.department}</p>
                  <p>{hospital.telephone}</p>
                  <p>{hospital.address}</p>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div>지원하는 병원 목록을 불러오는 데 실패했습니다.</div>
        )}
      </main>
      <TabBar />
    </>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
