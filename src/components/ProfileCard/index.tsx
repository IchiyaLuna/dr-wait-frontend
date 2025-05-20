// Components
import Card from '@/components/Card';
// Styles
import styles from './index.module.scss';
// Props
type Props = {
  title?: string;
};
// Component
export default function ProfileCard({}: Props) {
  return (
    <Card>
      <div className="text-2xl mb-2">안녕하세요 정연재님</div>
      <div className="text-base">최근 진료는 5월 12일입니다.</div>
    </Card>
  );
}
