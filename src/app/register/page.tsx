'use client';
// React
import React, { useState, useEffect } from 'react';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';

// 하드코딩된 샘플 사용자 정보
// const User = {
//   userId: 'abc',
//   password: 'System2000!!',
// };

export default function RegisterPage() {
  // 입력 상태
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [residentRegistrationNumber, setResidentRegistrationNumber] =
    useState('');

  // 유효성 상태
  const [usernameValid, setUsernameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [residentValid, setResidentValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // 핸들러들
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    setUsernameValid(val.trim().length > 0);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setId(val);
    setIdValid(val.trim().length > 0);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$`~!@$!%*#^?&()\-_=+]).{8,20}$/;
    setPasswordValid(regex.test(val));
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhoneNumber(val);
    const regex = /^\d{10,11}$/;
    setPhoneValid(regex.test(val));
  };

  const handleResidentRegistrationNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setResidentRegistrationNumber(val);
    const regex = /^\d{6}-?\d{7}$/;
    setResidentValid(regex.test(val));
  };

  // 회원가입 시도
  const onClickSignUp = () => {
    if (
      usernameValid &&
      idValid &&
      passwordValid &&
      phoneValid &&
      residentValid
    ) {
      alert('회원가입이 완료되었습니다.');
    } else {
      setErrorMsg('모든 항목을 올바르게 입력해주세요.');
    }
  };

  // 유효성 체크에 따라 버튼 활성화
  useEffect(() => {
    setErrorMsg('');
    if (
      usernameValid &&
      idValid &&
      passwordValid &&
      phoneValid &&
      residentValid
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [usernameValid, idValid, passwordValid, phoneValid, residentValid]);

  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={`${styles.main} flex flex-col overflow-x-visible`}>
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-2xl font-semibold text-gray-800">회원가입</h1>
          <button className="text-3xl text-gray-600 leading-none">
            &times;
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="flex-grow px-4 pt-6">
          {/* 이름 */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm text-gray-600 mb-1"
            >
              이름
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="이름을 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!usernameValid && username.length > 0 && (
              <p className="text-red-500 text-sm mt-1">이름을 입력해주세요.</p>
            )}{' '}
          </div>

          {/* 아이디 */}
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm text-gray-600 mb-1">
              아이디
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={id}
              onChange={handleId}
              placeholder="아이디를 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!idValid && id.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                아이디를 입력해주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="mb-4">
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

          {/* 전화번호 */}
          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="block text-sm text-gray-600 mb-1"
            >
              전화번호
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="전화번호를 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!phoneValid && phoneNumber.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                전화번호를 입력해주세요.
              </p>
            )}
          </div>

          {/* 주민등록번호 */}
          <div className="mb-4">
            <label
              htmlFor="resident_registration_number"
              className="block text-sm text-gray-600 mb-1"
            >
              주민등록번호
            </label>
            <input
              id="resident_registration_number"
              name="resident_registration_number"
              type="number"
              value={residentRegistrationNumber}
              onChange={handleResidentRegistrationNumber}
              placeholder="주민등록번호를 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-lg focus:outline-none focus:border-gray-500"
            />
            {!residentValid && residentRegistrationNumber.length > 0 && (
              <p className="text-red-500 text-sm mt-1">
                주민등록번호를 입력해주세요.
              </p>
            )}
          </div>
        </div>

        {/* 회원가입 버튼 및 에러 메시지 */}
        <div className="px-4 pb-6 pt-4">
          <button
            onClick={onClickSignUp}
            disabled={notAllow}
            className={`w-full py-4 rounded-2xl font-medium text-center ${
              notAllow
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-800'
            }`}
          >
            회원가입하기
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
