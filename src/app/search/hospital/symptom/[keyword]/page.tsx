// Components
import TopBar from '@/components/TopBar';
import Map from './Map.component';
// Styles
import styles from './page.module.scss';
// Props
type Props = Readonly<{
  params: Promise<{ keyword: string }>;
}>;
// Page
export default async function SearchHospitalSymptomKeyword({ params }: Props) {
  // Params
  const { keyword } = await params;
  const departments: string[] = await fetch(
    `${process.env.BACKEND_URL}/api/symptom/department?name=${keyword}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .catch(() => []);
  const decodedKeyword = decodeURIComponent(keyword);
  console.log(`SearchHospitalSymptomKeyword: ${decodedKeyword}`, departments);
  // Render
  return (
    <>
      <TopBar type={'BACK'} title={decodedKeyword} />
      <main className={styles.main}>
        <Map keyword={decodedKeyword} departments={departments} />
      </main>
    </>
  );
}
