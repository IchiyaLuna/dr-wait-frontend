import React from 'react';
import { auth, signOut } from '@/auth';
// Components
import TabBar from '@/components/TabBar';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import { User } from '@/types/user';
// Styles
import styles from './page.module.scss';
import Card from '@/components/Card';
// Page
export default async function ProfilePage() {
  // Authenticate user
  const session = await auth();
  const currentUser: User | null = session
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
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        <Card className={styles.profileCard}>
          <div className={styles.icon}>
            <i className={'fa-fw fa-light fa-user'} />
          </div>
          <div className={styles.info}>
            {currentUser ? (
              <div>
                <p>{currentUser.fullname}</p>
                <span>{currentUser.username}</span>
              </div>
            ) : null}
            <span>
              {currentUser ? currentUser.phoneNumber : '로그인 후 이용 가능'}
            </span>
          </div>
          {currentUser ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type="submit" className={styles.button}>
                로그아웃
              </button>
            </form>
          ) : (
            <Link href="/login?callbackUrl=profile" className={styles.button}>
              로그인
            </Link>
          )}
        </Card>

        <Card className={styles.menuCard}>
          <Link href={'/reservation'}>
            <i className={'fa-fw fa-regular fa-files-medical'} />
            <span>진료내역</span>
          </Link>
          <Link href={'/family'}>
            <i className={'fa-fw fa-regular fa-users-gear'} />
            <span>가족계정 관리</span>
          </Link>
          <Link href={'/profile/membership'}>
            <i className={'fa-fw fa-regular fa-money-check-dollar'} />
            <span>멤버십 관리</span>
          </Link>
          <Link href={'/support'}>
            <i className={'fa-fw fa-regular fa-user-headset'} />
            <span>고객지원</span>
          </Link>
        </Card>
      </main>
      <TabBar />
    </>
  );
}
