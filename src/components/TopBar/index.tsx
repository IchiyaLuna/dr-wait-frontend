// Styles
import styles from './index.module.scss';
// Props
type Props = {
  title?: string;
};
// Component
export default function TopBar({ title }: Props) {
  return (
    <div className={styles.wrapper}>
      <div>
        {title ? (
          title
        ) : (
          <span className={styles.logo}>
            Dr.Wait<sup>+</sup>
          </span>
        )}
      </div>
      <div>
        <i className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
}
