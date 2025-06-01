'use client'

import React, { useState } from 'react'
import TabBar from '@/components/TabBar';

// Styles
import styles from './page.module.scss';
// Page
export default function MembershipPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [agreed, setAgreed] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const today = new Date().toISOString().split('T')[0]

  const handlePayClick = () => {
    // 여기서 실제 결제 API 호출 로직을 넣어도 됩니다.
    // 예시에서는 단순히 모달만 띄워주는 형태입니다.
    setShowModal(true)
  }

  return (
    <>
      <main className={styles.main}>
        {/* 2-1) 플랜 카드 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800">닥터웨잇 멤버십</h2>
          <div className="mt-2 text-2xl font-bold text-gray-900 text-right">월 1,000원</div>
          <p className="mt-3 text-sm text-gray-500">
            이용권은 매월 자동으로 결제되며, 부가세 별도입니다.
            <br />
            언제든 해지 신청이 가능합니다.
          </p>
        </div>

        {/* 2-2) 결제 수단 선택 */}
        <div className="space-y-3 my-4">
          <h3 className="text-base font-medium text-gray-700">정기결제 수단</h3>

          {/* 라디오 버튼 스타일의 카드 3개 */}
          <label
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
              selectedMethod === 'kakaopay'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* 라디오 */}
              <input
                type="radio"
                name="payment"
                value="kakaopay"
                checked={selectedMethod === 'kakaopay'}
                onChange={() => setSelectedMethod('kakaopay')}
                className="h-4 w-4 text-blue-500 focus:ring-blue-300"
              />
              {/* 아이콘 대신 텍스트 혹은 실제 SVG/아이콘 컴포넌트를 사용해도 됩니다 */}
              <span className="text-gray-900 font-medium">카카오페이</span>
            </div>
            {/* 체크 아이콘 */}
            <div>
              {selectedMethod === 'kakaopay' && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </div>
          </label>

          <label
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
              selectedMethod === 'tosspay'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="tosspay"
                checked={selectedMethod === 'tosspay'}
                onChange={() => setSelectedMethod('tosspay')}
                className="h-4 w-4 text-blue-500 focus:ring-blue-300"
              />
              <span className="text-gray-900 font-medium">토스페이</span>
            </div>
            <div>
              {selectedMethod === 'tosspay' && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </div>
          </label>

          <label
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
              selectedMethod === 'card'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={() => setSelectedMethod('card')}
                className="h-4 w-4 text-blue-500 focus:ring-blue-300"
              />
              <span className="text-gray-900 font-medium">카드결제</span>
            </div>
            <div>
              {selectedMethod === 'card' && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </div>
          </label>  
        </div>
        {/* 2-3) 정기결제 금액 안내 (요청하신 영역) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">정기결제 금액</h3>
            <span className="text-lg font-semibold text-gray-900">1,000원</span>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="text-gray-500">결제 시작일</span>
               <span className="text-gray-800">{today}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-500">예상 결제금액</span>
              <span className="text-gray-800">1,000원</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              이용권에 따라 매년 또는 매월 자동결제됩니다.
            </p>
          </div>

          {/* 동의 체크박스 */}
          <label className="flex items-center space-x-2 my-4">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-4 w-4 text-blue-500 ring-1 ring-gray-300 rounded-sm focus:ring-blue-300"
            />
            <span className="text-gray-700 text-m">
              멤버십 약관 및 자동결제 동의
            </span>
          </label>
        </div>


        {/* 3) 하단 결제하기 버튼 */}
        <div className="pb-6 pt-2 bg-white">
          <button
            onClick={handlePayClick}
            disabled={!selectedMethod || !agreed}
            className={`w-full py-4 rounded-2xl font-medium text-base text-center transition ${
              selectedMethod && agreed
                ? 'bg-blue-100 text-gray-900 hover:bg-yellow-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            멤버십 결제하기
          </button>
        </div>

        {/* 4) 결제 완료 모달 */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 백드롭 */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => setShowModal(false)}
            ></div>

            {/* 모달 본체 */}
            <div className="relative bg-white rounded-xl p-6 max-w-xs w-full mx-4">
              <h4 className="text-lg font-semibold text-gray-800">결제 완료</h4>
              <p className="mt-3 text-gray-600">
                멤버십 구독이 정상적으로 완료되었습니다!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full py-2 bg-blue-600 text-center text-white rounded-lg font-medium hover:bg-blue-700"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </main>
      <TabBar />
    </>
  );
}