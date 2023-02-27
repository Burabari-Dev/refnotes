import { useNavigate } from 'react-router-dom';
import styles from './techBadge.module.css';

export default function TechBadge({ id, title }) {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/tech/${id}`);
  }

  return (
    <div className={styles.wrapper} onClick={handleNavigation}>{title}</div>
  )
}
