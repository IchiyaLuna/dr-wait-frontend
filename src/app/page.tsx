import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
import React from 'react';
// Data
const departments = [
  {
    name: '소아청소년과',
    icon: 'fa-baby',
    bgColor: 'bg-yellow-100',
  },
  {
    name: '가정의학과',
    icon: 'fa-house-chimney-medical',
    bgColor: 'bg-lime-100',
  },
  { name: '산부인과', icon: 'fa-person-dress', bgColor: 'bg-pink-100' },
  { name: '내과', icon: 'fa-stethoscope', bgColor: 'bg-red-100' },
  { name: '정형외과', icon: 'fa-bone', bgColor: 'bg-green-100' },
  {
    name: '피부과',
    icon: 'fa-hand-dots',
    bgColor: 'bg-orange-100',
  },
  { name: '안과', icon: 'fa-eye', bgColor: 'bg-blue-100' },
];
// Page
export default function HomePage() {
  return (
    <>
      <main className={styles.main}>
        {/* Profile */}
        <div className="p-4 bg-white border border-gray-300 rounded-3xl">
          <div className="text-2xl mb-2">안녕하세요 정연재님</div>
          <div className="text-base">최근 진료는 5월 12일입니다.</div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <div className="py-4 pl-7 pr-6 bg-white border border-gray-300 rounded-2xl">
            동네 인기 병원 🔥
          </div>
          <div className="py-4 pl-7 pr-6 bg-white border border-gray-300 rounded-2xl">
            지금 문연 병원 🛋️
          </div>
        </div>

        {/* search */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span role="img" aria-label="hospital">
            🏥
          </span>
          진료과로 병원 찾기{' '}
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {departments.map((dept, index) => (
            <div
              key={index}
              className={`min-w-[120px] rounded-2xl p-4 ${dept.bgColor} flex items-center justify-center flex-col gap-2 shadow-sm`}
            >
              <div className="text-2xl">
                <i className={`fa-solid ${dept.icon}`} />
              </div>
              <div className="text-sm font-medium text-center">{dept.name}</div>
            </div>
          ))}
        </div>
      </main>
      <TabBar />
    </>
  );
}
