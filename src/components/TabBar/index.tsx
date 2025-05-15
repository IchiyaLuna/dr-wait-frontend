// Styles
import styles from './index.module.scss';
import TabButton from '@/components/TabBar/TabButton';
// Props
type Props = {};
// Menus
const Menus = [
  {
    href: '/',
    text: '홈',
  },
  {
    href: '/reservation',
    text: '예약',
  },
  {
    href: '/profile',
    text: '마이페이지',
  },
];
// Component
export default function TabBar({}: Props) {
  return (
    <nav aria-label={'주 메뉴'} className={styles.wrapper}>
      <ul role={'tablist'} className={styles.tabList}>
        {Menus.map((m) => (
          <li role={'presentation'} key={m.href}>
            <TabButton text={m.text} icon={'fa-solid fa-house'} href={m.href} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
