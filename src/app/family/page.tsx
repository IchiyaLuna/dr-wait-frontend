// React
import React from 'react';
import Link from 'next/link';
// Auth
import { auth } from '@/auth';
import { Plus } from 'lucide-react';
// Components
import TopBar from '@/components/TopBar';
// Types
import { User } from '@/types/user';
import { FamilyMember } from '@/types/family';
// Styles
import styles from './page.module.scss';
import DeleteButton from '@/app/family/DeleteButton.component';
import Card from '@/components/Card';
import { acceptFamilyInvite, deleteFamilyMember } from '@/app/family/actions';
import { revalidatePath } from 'next/cache';
// Page
export default async function FamilyPage() {
  // Authenticate user
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  // Fetch User data
  const currentUser: User | null = await fetch(
    `${process.env.BACKEND_URL}/api/user/info`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => {
      return null;
    });
  if (!currentUser) return <div>Not authenticated</div>;
  // Fetch family members
  const { familyMembers }: { familyMembers: FamilyMember[] } = await fetch(
    `${process.env.BACKEND_URL}/api/family`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => {
      return { familyMembers: [] };
    });
  // Log
  console.log('family data:', familyMembers);
  // Constants
  const currentUserPendingInvite = familyMembers?.find(
    (member) => member.userId === session.token.id && !member.isConfirmed
  );
  const pendingInviteFamilyOwner = familyMembers?.find(
    (member) => member.role === '소유자'
  );
  const currentFamilyMember = familyMembers?.find(
    (member) => member.userId === session.token.id
  );
  const isCurrentUserOwner = familyMembers?.some((member) => {
    return member.userId === session.token.id && member.role === '소유자';
  });
  // Server actions
  async function handleExitFamily() {
    'use server';
    if (!currentFamilyMember) return;
    if (!session) return;
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/family/${currentFamilyMember.familyGroupId}/${currentFamilyMember.userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('가족 삭제에 실패했습니다.');
    }

    revalidatePath('/family');
  }
  // Render
  return (
    <>
      <TopBar type={'BACK'} title={'가족관리'} />
      <div className={styles.main}>
        {currentUserPendingInvite && pendingInviteFamilyOwner ? (
          <Card className={styles.invitation}>
            <div className={styles.header}>
              <div>
                <div className={styles.icon}>
                  <i className={'fa-fw fa-light fa-family'} />
                </div>
                <span>{pendingInviteFamilyOwner.fullname}님의 가족</span>
              </div>
            </div>
            <span>
              {pendingInviteFamilyOwner.fullname}님이 가족에 초대하셨습니다.
            </span>
            <div className={styles.buttons}>
              <button>거절하기</button>
              <button onClick={acceptFamilyInvite}>수락하기</button>
            </div>
          </Card>
        ) : null}
        {!currentUserPendingInvite ? (
          <div className={styles.header}>
            <div className={styles.family}>
              <div className={styles.icon}>
                <i className={'fa-fw fa-light fa-family'} />
              </div>
              <span>{currentUser.fullname}님의 가족</span>
            </div>
            <div>
              {isCurrentUserOwner || !familyMembers ? (
                <Link href="/family/invite" className={styles.invite}>
                  <div className={styles.icon}>
                    <i className={'fa-fw fa-light fa-user-plus'} />
                  </div>
                  <span>가족계정 초대</span>
                </Link>
              ) : (
                <button className={styles.exit} onClick={handleExitFamily}>
                  <div className={styles.icon}>
                    <i className={'fa-fw fa-light fa-xmark'} />
                  </div>
                  <span>가족 탈퇴</span>
                </button>
              )}
            </div>
          </div>
        ) : null}
        <div className={styles.users}>
          {!currentUserPendingInvite && familyMembers
            ? familyMembers
                .filter(
                  (member) =>
                    !isCurrentUserOwner || member.userId !== session.token.id
                )
                .map((member) => (
                  <div key={member.userId}>
                    <div className={styles.icon}>
                      <i className={'fa-fw fa-light fa-user'} />
                    </div>
                    <div className={styles.info}>
                      <p>{member.fullname}</p>
                      <span>{member.role}</span>
                    </div>
                    {!member.isConfirmed ? (
                      <div className={styles.tag}>수락 대기중</div>
                    ) : null}
                    {member.userId === session.token.id ? (
                      <div className={styles.tag}>나</div>
                    ) : null}
                    {isCurrentUserOwner ? (
                      <DeleteButton
                        className={styles.delete}
                        familyGroupId={member.familyGroupId}
                        memberId={member.userId}
                      >
                        삭제
                      </DeleteButton>
                    ) : null}
                  </div>
                ))
            : null}
        </div>
      </div>
    </>
  );
}
