import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
// Components
import Card from '@/components/Card';
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
import ReservationCard from '@/app/reservation/ReservationCard.component';
// Types
import { Reservation } from '@/types/reservation';
// Styles
import styles from './page.module.scss';
// Page
export default async function ReservationPage() {
  // Authenticate user
  const session = await auth();
  // Fetch  data
  const reservations: Reservation[] = session
    ? await fetch(`${process.env.BACKEND_URL}/api/reservation/my_reservation`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => null)
    : null;
  const filteredReservations = reservations
    ? reservations.filter((reservation) => !reservation.completed)
    : null;
  console.log(reservations);
  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        <div className={styles.tabs}>
          <Link href={'/reservation'} className={styles.active}>
            진행 중
          </Link>
          <Link href={'/reservation/history'}>과거 진료내역</Link>
        </div>
        {session ? (
          filteredReservations && filteredReservations.length ? (
            <div className={styles.reservations}>
              {filteredReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.reservationId}
                  reservation={reservation}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noReservations}>
              진행 중인 내역이 없습니다.
            </div>
          )
        ) : (
          <Card className={styles.guestCard}>
            <p>비로그인 사용자는 접수 내역을 볼 수 없습니다.</p>
            <Link href={`/login?callbackUrl=/reservation`}>로그인하기</Link>
          </Card>
        )}
      </main>
      <TabBar />
    </>
  );
}
