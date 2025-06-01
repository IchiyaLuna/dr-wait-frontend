'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Components
import TopBar from '@/components/TopBar';
// Actions
import {
  checkUserId,
  inviteFamily,
  stateType,
} from '@/app/family/invite/actions';
// Styles
import styles from './page.module.scss';
// initialState
const initialState: stateType = {
  message: null,
};
// Page
export default function InviteFamilyPage() {
  // Router
  const router = useRouter();
  // actionStates
  const [checkUserState, checkUserIdDispatch, isCheckUserIdPending] =
    useActionState(checkUserId, initialState);
  const [inviteState, inviteDispatch, isInvitePending] = useActionState(
    inviteFamily,
    initialState
  );
  // States
  const [memberId, setMemberId] = useState('');
  const [role, setRole] = useState('');
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  // Effects
  useEffect(() => {
    if (checkUserState && checkUserState.message === 'found') {
      setConfirmedId(memberId);
    }
  }, [checkUserState, memberId]);
  useEffect(() => {
    if (inviteState && inviteState.message === 'success') {
      router.replace('/family');
    }
  }, [inviteState, router]);
  // Render
  return (
    <>
      <TopBar type={'BACK'} title={'가족 초대'} />
      <div className={styles.main}>
        <div>
          <div>
            <h2>가족 계정을 추가해 주세요.</h2>
            <p>닥터웨잇에 가입된 계정만 초대하실 수 있습니다.</p>
          </div>
          <div className={styles.checkIdWrapper}>
            <form action={checkUserIdDispatch}>
              <div className={styles.inputGroup}>
                <input
                  name={'memberId'}
                  value={memberId}
                  disabled={confirmedId === memberId || isCheckUserIdPending}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder={'가족 아이디를 입력해 주세요'}
                />
                <button
                  type={'submit'}
                  disabled={confirmedId === memberId || isCheckUserIdPending}
                >
                  확인
                </button>
              </div>
              <input
                name={'memberId'}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={'가족의 역할을 입력해 주세요 (엄마, 자녀 등)'}
              />
            </form>
            {!inviteState &&
            checkUserState &&
            checkUserState.message !== 'found' ? (
              <span className={styles.error}>{checkUserState.message}</span>
            ) : null}
            {!inviteState &&
            checkUserState &&
            checkUserState.message === 'found' ? (
              <span>초대 가능한 아이디입니다.</span>
            ) : null}
            {inviteState && inviteState.message !== 'success' ? (
              <span className={styles.error}>{inviteState.message}</span>
            ) : null}
          </div>
        </div>
        <form action={inviteDispatch}>
          <input type={'hidden'} name={'memberId'} value={confirmedId ?? ''} />
          <input type={'hidden'} name={'role'} value={role ?? ''} />
          <button
            type={'submit'}
            className={styles.submit}
            disabled={!confirmedId || !role || isInvitePending}
          >
            초대하기
          </button>
        </form>
      </div>
    </>
  );
}
