'use client';
// React
import React, { useState, useActionState, useEffect } from 'react';
// Next.js
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
// Components
import TopBar from '@/components/TopBar';
// Actions
import { authenticate, stateType } from './actions';
// Styles
import styles from './page.module.scss';
// initialState
const initialState: stateType = {
  message: null,
};
// Page
export default function LoginPage() {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  // actionStates
  const [state, dispatch, isPending] = useActionState(
    authenticate,
    initialState
  );
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Flags
  const isButtonDisabled = !username || !password || isPending;
  // Effects
  useEffect(() => {
    if (state && state.message === 'success') {
      console.log('callbackUrl:', callbackUrl);
      router.replace(callbackUrl);
    }
  }, [state, router, callbackUrl]);
  // Render
  return (
    <>
      <TopBar type={'BACK'} title={'로그인'} />
      <main className={styles.main}>
        <form action={dispatch} className={styles.form}>
          <div className={styles.inputs}>
            <label htmlFor={'username'}>아이디</label>
            <input
              id={'username'}
              type={'text'}
              name={'username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={'아이디를 입력하세요'}
            />
            <label htmlFor={'password'}>비밀번호</label>
            <input
              id={'password'}
              type={'password'}
              name={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'비밀번호를 입력하세요'}
            />
            {state?.message && state.message !== 'success' && (
              <span className={styles.error}>{state.message}</span>
            )}
            <Link href={'/register'} className={styles.register}>
              회원가입
            </Link>
          </div>

          <button
            type={'submit'}
            className={styles.submit}
            disabled={isButtonDisabled}
          >
            로그인하기
          </button>
        </form>
      </main>
    </>
  );
}
