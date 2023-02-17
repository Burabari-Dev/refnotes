import styles from './multiContent.module.css'

export default function MultiContent({ type, data }) {
  
    if(type === 'TXT'){
      return <div className={styles.text}><p> {data} </p></div>
    }
    return <pre><code> `${data}` </code></pre>
}
