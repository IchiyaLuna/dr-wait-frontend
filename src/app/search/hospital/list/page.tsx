import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
import TopBar from '@/components/TopBar';
import { Hospital } from '@/types/hospital';
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
        {data ? (
          data.map((hospital: Hospital) => (
            <div key={hospital.id} className={styles.hospitalCard}>
              <h3>{hospital.name}</h3>
              <p>{hospital.address}</p>
              <p>전화: {hospital.telephone}</p>
              <a
                href={hospital.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                웹사이트 방문하기
              </a>
              <p>진료과: {hospital.department}</p>
            </div>
          ))
        ) : (
          <div>지원하는 병원 목록을 불러오는 데 실패했습니다.</div>
        )}
      </main>
      <TabBar />
    </>
  );
}
