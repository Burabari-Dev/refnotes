import styles from './titlePaper.module.css';

export default function TitlePaper({ index = 0, title = '', id = '' }) {

  return (
    <div className={styles.wraper}>
      {title}
    </div>
  )
}
