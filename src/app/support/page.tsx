import React from 'react';
import { ChevronLeft } from 'lucide-react';
import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
// Page
export default function SupportPage() {
  const userName = '최성하';

  return (
    <>
      <main className={styles.main}>
        <div className="relative mb-6 flex items-center justify-center">
          <button className="absolute left-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-medium">고객센터</h1>
        </div>

        {/* 인사말 */}
        <div className="mb-6">
          <p className="text-lg font-semibold">
            {userName}님, <br />
            <span className="font-bold text-2xl">무엇을 도와드릴까요?</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            문의사항이 있으신 경우 메일로 연락주세요!
          </p>
        </div>

        {/* 이메일 안내 박스 */}
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-md px-5 py-4 flex items-center gap-3">
          <span className="text-xl">📧</span>
          <span className="text-base font-medium text-gray-700">
            drwait123@yonsei.ac.kr
          </span>
        </div>
      </main>
      <TabBar/>
    </>
  );
}
