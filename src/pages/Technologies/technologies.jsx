import { useEffect, useState } from 'react';
import { allTechs } from '../../services/backend';
import TechBadge from '../../features/tech-badge/techBadge';
import styles from './technologies.module.css';

export default function Technologies() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await allTechs();
      setTechs(data);
    }
    fetchData();
  }, [])

  return (
    <div className={styles.content}>
      {techs.map(t => <TechBadge key={t.id} id={t.id} title={t.data.title} />)}
    </div>
  )
}
