import TabBar from '@/components/TabBar';
// Styles
import styles from './page.module.scss';
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
      </main>
      <TabBar />
    </>
  );
}
