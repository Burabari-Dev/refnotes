import HeaderRow from '../features/header-row/HeaderRow';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.main}>
      <HeaderRow />
    </div>
  )
}
