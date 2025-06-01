import Link from 'next/link';
import { auth } from '@/auth';
// Components
import Card from '@/components/Card';
// Types
import { User } from '@/types/user';
import { Reservation } from '@/types/reservation';
// Styles
import styles from './index.module.scss';
// Props
type Props = {
  title?: string;
};
// Component
export default async function ProfileCard({}: Props) {
  const session = await auth();
  // Fetch user data
  const data: User | null = session
    ? await fetch(`${process.env.BACKEND_URL}/api/user/info`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => null)
    : null;
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
    ? reservations.filter((reservation) => reservation.completed)
    : null;
  const reservation = filteredReservations
    ? filteredReservations.sort((a, b) =>
        a.reservationTime > b.reservationTime ? -1 : 1
      )[0]
    : null;
  console.log('ProfileCard reservation:', reservation);
  // Render
  return (
    <Card className={styles.profileCard}>
      {session && data ? (
        <div className={styles.memberWrapper}>
          <div>
            <i className={`fa-fw fa-light fa-user`} />
            <div>
              <h2>{data.fullname}님, 안녕하세요</h2>
            </div>
            {reservation ? (
              <span>
                마지막 진료{' '}
                {new Date(reservation.reservationTime).toLocaleString()}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.guestWrapper}>
          <div>
            <i className={`fa-fw fa-duotone fa-id-card`} />
            <div>
              <h2>닥터웨잇 로그인 후</h2>
              <h2>더 많은 서비스를 경험해보세요.</h2>
            </div>

            <span>가입 이후 병원 접수 이용 가능합니다.</span>
          </div>

          <Link href="/login" className={styles.login}>
            로그인하기
          </Link>
        </div>
      )}
    </Card>
  );
}
