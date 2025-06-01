import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
// Page
export default function ReservationPage() {
  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        <div>
          <div>진행중</div>
          <div>과거 진료내역</div>
        </div>
        <div>
          <div className={styles.reservationCard}>
            <h3>병원 이름</h3>
            <p>진료과목</p>
            <p>접수 시간</p>
            <p>진료 시간</p>
          </div>
          <div className={styles.reservationCard}>
            <h3>병원 이름</h3>
            <p>진료과목</p>
            <p>접수 시간</p>
            <p>진료 시간</p>
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
