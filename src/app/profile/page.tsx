import React from 'react';

import TabBar from '@/components/TabBar';
import Link from 'next/link';
import { User } from 'lucide-react';
// Styles
import styles from './page.module.scss';
// Page
export default function ProfilePage() {
  const userName = '최성하';
  const id = 'sungha123';
  const birth = '2001년 03월 16일';

  return (
    <>
      <main className={styles.main}>
        <div className="items-center gap-4 my-4">
          <span className="text-xl font-bold">마이페이지</span>
        </div>
        <div className="flex items-center justify-between my-4">
          {/* 왼쪽: 프로필 */}
          <div className="flex items-center gap-4">
            {/* 프로필 아이콘 */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue" size={28} />
            </div>

            {/* 이름 + 아이디 + 생일 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-medium">최성하</span>
                <span className="text-xs text-gray-500">hahaha123</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">2001년 03월 16일</span>
            </div>
          </div>

          {/* 오른쪽: 프로필 설정 버튼 */}
          <button className="border border-gray-300 text-sm px-2 py-1 rounded font-medium text-gray-800 bg-transparent">
            프로필 설정
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <Link href="" className="flex justify-between items-center py-6 border-b border-gray-100">진료내역</Link>
        <Link href="/family" className="flex justify-between items-center py-6 border-b border-gray-100">가족계정 관리</Link>
        <Link href="/membership" className="flex justify-between items-center py-6 border-b border-gray-100">멤버십 관리</Link>
        <Link href="/support" className="flex justify-between items-center py-6 border-b border-gray-100">고객센터</Link>
      </main>
      <TabBar />
    </>
  );
}

function ListItem({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100">
      <span>{title}</span>
    </div>
  );
}