'use client';
// React
import React, { useState, useEffect, useRef, useActionState } from 'react';
// Next.js
import { useRouter } from 'next/navigation';
// Motion
import { motion } from 'motion/react';
// Components
import TopBar from '@/components/TopBar';
// Actions
import { signup, stateType } from './actions';
// Styles
import styles from './page.module.scss';
// initialState
const initialState: stateType = {
  message: null,
};
// Page
export default function RegisterPage() {
  // Router
  const router = useRouter();
  // Refs
  const rrnFrontRef = useRef<HTMLInputElement>(null);
  const rrnBackRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  // actionStates
  const [state, dispatch, isPending] = useActionState(signup, initialState);
  // States
  const [step, setStep] = useState(1);
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rrnFront, setRRNFront] = useState('');
  const [rrnBack, setRRNBack] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Flags
  const isNextButtonDisabled =
    fullname.length > 0 &&
    phoneNumber.length === 11 &&
    rrnFront.length === 6 &&
    rrnBack.length === 7;
  const isSubmitButtonDisabled = !username || !password || isPending;
  // Functions
  const handleNumberOnlyInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    length: number
  ) => {
    const originalValue = e.target.value;
    let onlyNumbers = originalValue.replace(/\D/g, '');
    if (onlyNumbers.length > length) {
      onlyNumbers = onlyNumbers.slice(0, length);
    }
    return onlyNumbers;
  };
  const handleLowerAlphaNumInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    length: number
  ) => {
    const originalValue = e.target.value;
    let onlyLowerAlphaNum = originalValue
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase();
    if (onlyLowerAlphaNum.length > length) {
      onlyLowerAlphaNum = onlyLowerAlphaNum.slice(0, length);
    }
    return onlyLowerAlphaNum;
  };
  const handlePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    length: number
  ) => {
    const originalValue = e.target.value;
    let password = originalValue.replace(/[^A-Za-z0-9!#$%&*+\-.:?@^_~]/g, '');
    if (password.length > length) {
      password = password.slice(0, length);
    }
    return password;
  };
  // Effects
  useEffect(() => {
    if (phoneNumber.length === 11 && rrnFrontRef.current) {
      rrnFrontRef.current.focus();
    }
  }, [phoneNumber]);
  useEffect(() => {
    if (rrnFront.length === 6 && rrnBackRef.current) {
      rrnBackRef.current.focus();
    }
  }, [rrnFront]);
  useEffect(() => {
    if (rrnBack.length === 7 && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [rrnBack]);
  useEffect(() => {
    if (state && state.message === 'success') {
      router.push('/login');
    }
  }, [state, router]);
  // Render
  console.log('rerender RegisterPage');
  return (
    <>
      <TopBar type={'BACK'} title={'회원가입'} />
      <main className={styles.main}>
        <form action={dispatch} className={styles.form}>
          <input type={'hidden'} name={'fullname'} value={fullname} />
          <input type={'hidden'} name={'phoneNumber'} value={phoneNumber} />
          <input type={'hidden'} name={'rrnFront'} value={rrnFront} />
          <input type={'hidden'} name={'rrnBack'} value={rrnBack} />

          <div className={styles.inputs}>
            {step === 1 && (
              <>
                <label htmlFor={'fullname'}>이름</label>
                <input
                  id={'fullname'}
                  type={'text'}
                  value={fullname}
                  maxLength={10}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder={'이름을 입력하세요'}
                />
              </>
            )}
            {step === 1 && fullname.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label htmlFor={'phoneNumber'}>휴대폰 번호</label>
                <input
                  id={'phoneNumber'}
                  type={'tel'}
                  value={phoneNumber}
                  maxLength={11}
                  inputMode={'numeric'}
                  onChange={(e) => setPhoneNumber(handleNumberOnlyInput(e, 11))}
                  placeholder={"'-' 없이 숫자만 입력하세요"}
                />
              </motion.div>
            )}
            {step === 1 && phoneNumber.length === 11 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label htmlFor={'rrnFront'}>주민등록번호</label>
                <div className={styles.inputRow}>
                  <input
                    ref={rrnFrontRef}
                    id={'rrnFront'}
                    type={'text'}
                    value={rrnFront}
                    maxLength={6}
                    inputMode={'numeric'}
                    onChange={(e) => setRRNFront(handleNumberOnlyInput(e, 6))}
                    placeholder={'앞 6자리를 입력하세요'}
                  />
                  <span>-</span>
                  <input
                    ref={rrnBackRef}
                    id={'rrnBack'}
                    type={'password'}
                    value={rrnBack}
                    maxLength={7}
                    inputMode={'numeric'}
                    onChange={(e) => setRRNBack(handleNumberOnlyInput(e, 7))}
                    placeholder={'뒤 7자리를 입력하세요'}
                  />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label htmlFor={'username'}>아이디</label>
                <input
                  ref={usernameRef}
                  id={'username'}
                  type={'text'}
                  name={'username'}
                  value={username}
                  maxLength={50}
                  onChange={(e) => setUsername(handleLowerAlphaNumInput(e, 50))}
                  placeholder={'영문 소문자와 숫자만 입력하세요'}
                />
              </motion.div>
            )}
            {step === 2 && username.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label htmlFor={'password'}>비밀번호</label>
                <input
                  id={'password'}
                  type={'password'}
                  name={'password'}
                  value={password}
                  maxLength={50}
                  onChange={(e) => setPassword(handlePasswordInput(e, 100))}
                  placeholder={'비밀번호를 입력하세요'}
                />
              </motion.div>
            )}
            {step === 2 && state?.message && state.message !== 'success' && (
              <span className={styles.error}>{state.message}</span>
            )}
          </div>

          {step === 1 && (
            <button
              type={'button'}
              className={styles.submit}
              disabled={isNextButtonDisabled}
              onClick={() => setStep(2)}
            >
              다음
            </button>
          )}
          {step === 2 && (
            <button
              type={'submit'}
              className={styles.submit}
              disabled={isSubmitButtonDisabled}
            >
              회원가입하기
            </button>
          )}
        </form>
      </main>
    </>
  );
}
