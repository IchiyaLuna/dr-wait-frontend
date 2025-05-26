'use client';
// React
import React, { useState, useEffect } from 'react';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
import Link from 'next/link';
// Styles
import styles from '../page.module.scss';

// 하드코딩된 샘플 사용자 정보
const User = {
  userId: 'abc',
  password: 'System2000!!',
};

export default function LoginPage() {
  // 상태 선언
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdValid, setUserIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // 아이디 입력 핸들러
  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserId(val);
    setUserIdValid(val.trim().length > 0);
  };

  // 비밀번호 입력 핸들러
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    // 영문 + 숫자 + 특수문자 포함 8~20자
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$`~!@$!%*#^?&()\-_=+]).{8,20}$/;
    setPasswordValid(regex.test(val));
  };

  // 로그인 시도
  const onClickLogin = () => {
    if (userId === User.userId && password === User.password) {
      alert('로그인에 성공했습니다.');
    } else {
      setErrorMsg('등록되지 않은 회원이거나 입력값이 일치하지 않습니다.');
    }
  };

  // 유효성 변화 시 버튼 활성화/비활성화
  useEffect(() => {
    // 에러메시지 초기화
    setErrorMsg('');
    if (userIdValid && passwordValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [userIdValid, passwordValid]);

  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={`${styles.main} flex flex-col overflow-x-visible`}>
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-2xl font-semibold text-gray-800">로그인</h1>
          <button className="text-3xl text-gray-600 leading-none">
            &times;
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="flex-grow px-4 pt-6">
          {/* 아이디 */}
          <div className="mb-8">
            <label
              htmlFor="userId"
              className="block text-sm text-gray-600 mb-1"
            >
              아이디
            </label>
            <input
              id="userId"
              name="userId"
              type="text"
              value={userId}
              onChange={handleUserId}
              placeholder="아이디를 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!userIdValid && userId.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                아이디를 입력해주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="비밀번호를 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!passwordValid && password.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
              </p>
            )}
          </div>

          {/* 링크 */}
          <div className="flex justify-center mt-2 pt-6 gap-4 text-sm text-gray-600">
            <Link href="/signup" className="hover:underline">
              회원가입
            </Link>
            <span>|</span>
            <Link href="/find" className="hover:underline">
              아이디 / 비밀번호 찾기
            </Link>
          </div>
        </div>

        {/* 로그인 버튼 및 에러 메시지 */}
        <div className="px-4 pb-6 pt-4">
          <button
            onClick={onClickLogin}
            disabled={notAllow}
            className={`w-full py-4 rounded-2xl font-medium text-center ${
              notAllow
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-800'
            }`}
          >
            로그인하기
          </button>
          {errorMsg && (
            <p className="text-center text-red-500 mt-2">{errorMsg}</p>
          )}
        </div>
      </main>
      <TabBar />
    </>
  );
}
