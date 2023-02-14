import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo() {
  const navigate = useNavigate();
  
  function handleNavigate(){
    navigate('/');
  }

  return (
    <div className={styles.logo} onClick={handleNavigate} > Ref-Notes </div>
  )
}
