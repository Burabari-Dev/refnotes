import Logo from '../logo/Logo';
import UserBadge from '../user-badge/UserBadge';
import styles from './HeaderRow.module.css';

export default function HeaderRow() {
  return (
    <div className={styles.container}>
      <Logo />
      <UserBadge />
    </div>
  )
}
