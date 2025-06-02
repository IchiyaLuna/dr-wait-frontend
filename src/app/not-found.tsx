// Components
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
import Card from '@/components/Card';
// Styles
import styles from './page.module.css';
// Page
export default function NotFound() {
  return (
    <>
      <TopBar type={'LOGO'} />
      <main className={styles.main}>
        <Card className={styles.notFoundCard}>
          <h1>페이지를 찾을 수 없습니다.</h1>
          <Link href={'/'}>돌아가기</Link>
        </Card>
      </main>
      <TabBar />
    </>
  );
}
