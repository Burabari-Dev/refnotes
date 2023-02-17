import { useState } from 'react';
import MultiContent from '../multi-content/multiContent';
import styles from './paragraph.module.css';

export default function Paragraph({ type, contents = [] | '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if(typeof contents === 'string'){
    return <p>{contents}</p>
  }

  const multiContents = contents.map(c => <MultiContent key={c.id} type={type} data={c.data} />);

  function handleClick(index) {
    setActiveIndex(index);
  }

  return (
    <div>
      <div className={styles.optionsHeader}>
        {
          contents.map((c, index) => (
            <button key={index} onClick={handleClick}>{c.option}</button>
          ))
        }
      </div>
      {multiContents[activeIndex]}
    </div>
  )

}
