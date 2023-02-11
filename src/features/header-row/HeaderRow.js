import Logo from '../logo/Logo';
import styles from './HeaderRow.module.css';

export default function HeaderRow() {
  return (
    <div className={styles.container}>
      <Logo />
    </div>
  )
}
