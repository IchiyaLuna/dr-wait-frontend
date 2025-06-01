// React
import React from 'react';
import Link from 'next/link';
// Auth.js
import { auth } from '@/auth';
// Components
import TopBar from '@/components/TopBar';
import Card from '@/components/Card';
import ReservationSelector from './ReservationSelector.component';
// Actions
import { createReservation } from './actions';
// Types
import { User } from '@/types/user';
import { Symptom } from '@/types/symptom';
import { Hospital } from '@/types/hospital';
import { FamilyMember } from '@/types/family';
// Styles
import styles from './page.module.scss';
// Page
export default async function HospitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Params
  const { id } = await params;
  // Authenticate user
  const session = await auth();
  // Fetch hospital data
  const hospital: Hospital = await fetch(
    `${process.env.BACKEND_URL}/api/hospital/${id}`
  )
    .then((res) => res.json())
    .catch(() => null);
  // Fetch symptoms data
  const symptoms: Symptom[] = await fetch(
    `${process.env.BACKEND_URL}/api/symptom/department/${hospital.department}`
  )
    .then((res) => res.json())
    .catch(() => null);
  // Fetch User data
  const currentUser: User | null = session
    ? await fetch(`${process.env.BACKEND_URL}/api/user/info`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => {
          return null;
        })
    : null;
  // Fetch family members
  const { familyMembers }: { familyMembers: FamilyMember[] | null } = session
    ? await fetch(`${process.env.BACKEND_URL}/api/family`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      })
        .then((res) => res.json())
        .catch(() => {
          return {
            familyMembers: null,
          };
        })
    : {
        familyMembers: null,
      };

  const filteredFamilyMembers =
    familyMembers &&
    familyMembers
      .filter((member) => member.isConfirmed)
      .sort((a, b) =>
        session
          ? (a.userId === session.token.id ? -1 : 1) -
            (b.userId === session.token.id ? -1 : 1)
          : 0
      );

  const filteredSymptoms: Symptom[] = symptoms.reduce(
    (acc: Symptom[], symptom) => {
      if (acc.some((s) => s.name === symptom.name)) {
        return acc;
      } else {
        return [...acc, symptom];
      }
    },
    []
  );

  return (
    <>
      <TopBar type={'BACK'} />
      <form action={createReservation} className={styles.form}>
        <input type="hidden" name="hospitalId" value={id} />
        <main className={styles.main}>
          {hospital ? (
            <Card className={styles.hospitalCard}>
              <div>
                <h2>{hospital.name}</h2>
                <span className={styles.hospitalDepartment}>
                  {hospital.department}
                </span>
              </div>
              <span>{hospital.address}</span>

              <a href={hospital.websiteUrl}>{hospital.websiteUrl}</a>
              <a href={`tel:${hospital.telephone}`}>{hospital.telephone}</a>
            </Card>
          ) : (
            <div className={styles.error}>
              병원 정보를 불러오는 데 실패했습니다.
            </div>
          )}
          {session && currentUser ? (
            <ReservationSelector
              userId={session.token.id}
              currentUser={currentUser}
              familyMembers={
                filteredFamilyMembers ?? [
                  {
                    familyGroupId: 0,
                    userId: session.token.id,
                    fullname: currentUser.fullname,
                    role: '소유자',
                    phoneNumber: currentUser.phoneNumber,
                    isConfirmed: true,
                  },
                ]
              }
              symptoms={filteredSymptoms}
            />
          ) : (
            <Card className={styles.guestCard}>
              <p>비로그인 사용자는 접수 할 수 없습니다.</p>
              <Link href={`/login?callbackUrl=/hospital/${id}`}>
                로그인하기
              </Link>
            </Card>
          )}
        </main>
        <div className={styles.footer}>
          <button
            type={'submit'}
            className={styles.checkIn}
            disabled={!currentUser}
          >
            진료 접수하기
          </button>
        </div>
      </form>
    </>
  );
}
