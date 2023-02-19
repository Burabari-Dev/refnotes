import { useNavigate } from 'react-router-dom';
import styles from './techBadge.module.css';

export default function TechBadge({ tech }) {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/tech/${tech.id}`);
  }

  return (
    <div className={styles.wrapper} onClick={handleNavigation}>{tech.title}</div>
  )
}
