// Components
import Card from '@/components/Card';
import { auth } from '@/auth';
import Link from 'next/link';
import { getToken } from '@auth/core/jwt';
// Styles
import styles from './index.module.scss';
// Props
type Props = {
  title?: string;
};
// Component
export default async function ProfileCard({}: Props) {
  const session = await auth();

  const data = session
    ? await fetch(`${process.env.BACKEND_URL}/api/user/info`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => null)
    : null;
  // Render
  return (
    <Card className={styles.profileCard}>
      {session && data ? (
        <div className={styles.memberWrapper}>
          <div className="text-2xl mb-2">안녕하세요 {data.fullname}님</div>
          <div>마지막 진료: 아직 없음</div>
          <div>접수중인 진료가 없습니다</div>
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
