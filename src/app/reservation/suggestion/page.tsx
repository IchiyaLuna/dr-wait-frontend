// React
import React from 'react';
// Next.js
import Link from 'next/link';
// Auth.js
import { auth } from '@/auth';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
import Suggestion from '@/app/reservation/suggestion/Suggestion.component';
// Types
import { Reservation } from '@/types/reservation';
// Styles
import styles from './page.module.scss';
// Page
export default async function ReservationSuggestionPage() {
  // Authenticate user
  const session = await auth();
  // Fetch reservation data
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
  // Filter reservations to show only those that are confirmed and not completed
  const filteredReservations = reservations
    ? reservations.filter(
        (reservation) => reservation.confirmed && !reservation.completed
      )
    : null;
  // Fetch category data
  const categories: { category: string[] } = session
    ? await fetch(
        `${process.env.BACKEND_URL}/api/recommend?waitingTime=${filteredReservations ? filteredReservations[0].waitingTime : 0}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .catch(() => null)
    : { category: [] };

  // Render
  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        {filteredReservations && filteredReservations.length ? (
          <Suggestion categories={categories.category} />
        ) : (
          <div className={styles.noSuggestions}>
            <div>대기 중인 진료가 없습니다.</div>
            <Link href={'/search/hospital/list'}>진료 예약하기</Link>
          </div>
        )}
      </main>
      <TabBar />
    </>
  );
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;
