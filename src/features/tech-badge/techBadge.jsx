import styles from './techBadge.module.css';

export default function TechBadge({ title }) {
  return (
    <div className={styles.wrapper}>{title}</div>
  )
}
