'use client';

import React, { useState } from 'react';

interface InviteFamilyPageProps {
  onInvite: (id: string) => void;
}

export default function InviteFamilyPage({ onInvite = () => {} }: InviteFamilyPageProps) {
  const [inputId, setInputId] = useState('');
  const [status, setStatus] = useState<'found' | 'not_found' | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // 실제 등록된 유저 목록 (예시)
  const registeredUsers = ['hong123', 'kim456', 'lee789'];

  const handleCheck = () => {
    const trimmed = inputId.trim();
    if (!trimmed) return;

    if (registeredUsers.includes(trimmed)) {
      setStatus('found');
    } else {
      setStatus('not_found');
    }
  };

  const handleInvite = () => {
    if (status !== 'found') return;

    onInvite(inputId.trim()); // 부모 컴포넌트로 전달
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
    setInputId('');
    setStatus(null);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <button className="text-lg px-2">&lt;</button>

      {/* 타이틀 */}
      <div className='my-6'>
        <h1 className="text-xl font-semibold">
          가족의 계정을 추가해주세요.
        </h1>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          닥터웨잇에 가입된 계정만 초대하실 수 있습니다.
        </p>
      </div>

      {/* 입력 + 확인 버튼 */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          className="flex-1 border-b-2 border-gray-300 text-lg py-2 focus:outline-none focus:border-black"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-blue-100 text-500 rounded-md text-em"
        >
          확인
        </button>
      </div>

      {/* 결과 메시지 */}
      <div className="h-6 mb-6">
        {status === 'found' && (
          <p className="text-blue-600 text-sm">✅ 존재하는 계정입니다.</p>
        )}
        {status === 'not_found' && (
          <p className="text-red-500 text-sm">❌ 존재하지 않는 계정입니다.</p>
        )}
      </div>

      {/* 초대 버튼 */}
      <button
        onClick={handleInvite}
        disabled={status !== 'found'}
        className={`w-full py-3 rounded-md text-base font-medium text-center transition ${
          status === 'found'
            ? 'bg-blue-100 text-black'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        가족 초대하기
      </button>

      {/* 완료 메시지 */}
      {showMessage && (
        <div className="mt-6 text-green-600 text-sm text-center">
          초대가 완료되었습니다.
          <br/>
          상대방의 초대 요청 수락후 서비스를 사용하실 수 있습니다.
        </div>
      )}
    </div>
  );
}
