import HeaderRow from '../../features/header-row/HeaderRow';
import { Outlet } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <HeaderRow />
      <Outlet />
    </div>
  )
}
