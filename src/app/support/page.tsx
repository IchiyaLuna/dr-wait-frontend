import React from 'react';
// Components
import TabBar from '@/components/TabBar';
import TopBar from '@/components/TopBar';
// Styles
import styles from './page.module.scss';
// Page
export default function SupportPage() {
  return (
    <>
      <TopBar type={'BACK'} title={'고객센터'} />
      <main className={styles.main}>
        {/* 인사말 */}
        <div className="mb-6">
          <p className="text-lg font-semibold">
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
      <TabBar />
    </>
  );
}
