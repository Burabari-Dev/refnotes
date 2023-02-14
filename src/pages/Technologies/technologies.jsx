import TechBadge from '../../features/tech-badge/techBadge';
import { getAllTechs } from '../../services/backend';
import styles from './technologies.module.css';

export default function Technologies() {
  const techs = getAllTechs();
  return (
    <div className={styles.content}>
      {techs.map(t => <TechBadge title={t.name} key={t.id} />)}
    </div>
  )
}
