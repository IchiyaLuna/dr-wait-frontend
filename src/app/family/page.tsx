import React from 'react';
import { User, Plus } from 'lucide-react';
import Link from 'next/link';

export default function FamilyPage() {
  const invitedUser = {
    name: '홍길동',
    id: 'hong123',
    //초대 수락 여부
    isAccepted: false,
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between">
        <button className="text-lg px-2">&lt;</button>
        <h1 className="text-lg font-semibold">가족관리</h1>
        <button className="text-gray-500 px-2">?</button>
      </div>

      {/* 가족관리 아이콘 섹션 */}
      <div className="flex justify-around my-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue" size={28} />
          </div>
          <span className="mt-2 text-sm font-medium">최성하</span>
        </div>
        <div className="flex flex-col items-center">
          <Link href="/invite" className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus />
          </Link>
          <span className="mt-2 text-sm text-gray-500">가족계정 초대</span>
        </div>
      </div>

      {/* 초대된 계정 카드 (수락 전)*/}
      <div className="border border-gray-200 rounded-lg p-4 my-2 flex items-center justify-between">
        {/* 왼쪽: 아이콘 + 이름/아이디 */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium">{invitedUser.name}</span>
            <span className="text-sm text-gray-500">{invitedUser.id}</span>
          </div>
        </div>

        {/* 오른쪽: 초대 수락 대기중 문구 */}
        {!invitedUser.isAccepted && (
          <div className="bg-gray-400 text-white text-xs px-3 py-1 rounded-full">
            초대 수락 대기중
          </div>
        )}
      </div>
      {/* 초대된 계정 카드 (수락 후후)*/}
      <div className="border border-gray-200 rounded-lg p-4 my-2 flex items-center justify-between">
        {/* 왼쪽: 아이콘 + 이름/아이디 */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium">{invitedUser.name}</span>
            <span className="text-sm text-gray-500">{invitedUser.id}</span>
          </div>
        </div>

        {/* 오른쪽: 초대 수락 대기중 문구 */}
        {!invitedUser.isAccepted && (
          <div className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full">
            초대 수락 완료
          </div>
        )}
      </div>
    </div>
  );
}
