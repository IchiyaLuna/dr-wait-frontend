import { Reservation } from '@/types/reservation';
import { Hospital } from '@/types/hospital';
import Card from '@/components/Card';
// Styles
import styles from './page.module.scss';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
// Props
type Props = Readonly<{
  reservation: Reservation;
}>;
// Component
export default async function ReservationCard({ reservation }: Props) {
  // Authenticate user
  const session = await auth();
  // Fetch hospital data
  const hospital: Hospital = await fetch(
    `${process.env.BACKEND_URL}/api/hospital/${reservation.hospitalId}`
  )
    .then((res) => res.json())
    .catch(() => null);

  const handleCancel = async () => {
    'use server';
    if (!session) return;
    console.log('Cancelling reservation:', reservation.reservationId);
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/reservation/reservation_cancel`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
        body: JSON.stringify({
          reservationId: reservation.reservationId,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to cancel reservation');
      return;
    }

    revalidatePath('/reservation');
  };

  return (
    (hospital ?? reservation) && (
      <Card className={styles.reservationCard}>
        <div className={styles.row}>
          <div>
            <div
              className={[
                styles.tag,
                !reservation.confirmed && styles.pending,
                reservation.completed && styles.finished,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {reservation.confirmed
                ? reservation.completed
                  ? '진료 완료'
                  : '접수 완료'
                : '접수 대기중'}
            </div>
            <h3>{hospital.name}</h3>
            <span>{reservation.symptomName}</span>
          </div>
          <div className={styles.waiting}>
            {reservation.confirmed ? (
              <>
                {!reservation.completed ? (
                  <>
                    <div>대기 {reservation.waitingOrder}번</div>
                    <span>
                      {reservation.waitingTime === 0
                        ? '즉시 진료 가능'
                        : `예상 대기 시간 ${reservation.waitingTime}분`}
                    </span>
                  </>
                ) : null}
              </>
            ) : (
              <div className={styles.pending}>대기중</div>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.location}>{hospital.address}</div>
          <div className={styles.time}>
            {new Date(reservation.reservationTime).toLocaleString()}
          </div>
        </div>
        {!reservation.completed ? (
          reservation.confirmed ? (
            <Link
              href={'/reservation/suggestion'}
              className={styles.suggestion}
            >
              할 일 추천받기
            </Link>
          ) : (
            <button
              type={'button'}
              className={styles.cancel}
              onClick={handleCancel}
            >
              접수 취소
            </button>
          )
        ) : null}
      </Card>
    )
  );
}
