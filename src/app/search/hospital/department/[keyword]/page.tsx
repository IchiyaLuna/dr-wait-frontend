// Components
import TopBar from '@/components/TopBar';
import Map from './Map.component';
// Styles
import styles from './page.module.scss';
// Props
type Props = Readonly<{
  params: Promise<{ keyword: string }>;
  searchParams: Promise<{ category: string }>;
}>;
// Page
export default async function SearchHospitalDepartmentKeyword({
  params,
  searchParams,
}: Props) {
  // Params
  const { keyword } = await params;
  const { category } = await searchParams;
  const decodedKeyword = decodeURIComponent(keyword);
  // Render
  return (
    <>
      <TopBar type={'BACK'} title={decodedKeyword} />
      <main className={styles.main}>
        <Map keyword={decodedKeyword} category={category} />
      </main>
    </>
  );
}
