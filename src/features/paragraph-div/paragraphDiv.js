import { useState } from 'react';
import MultiContent from '../multi-content/multiContent';
import styles from './paragraphDiv.module.css';

export default function ParagraphDiv({ contents = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (contents.length === 0) {
    return <></>
  }

  if (contents.length < 2) {
    return <p>{contents[0].data}</p>
  }

  const multiContents = contents.map(c => <MultiContent key={c.id} type={c.type} data={c.data} />);

  function handleClick(index) {
    setActiveIndex(index);
  }

  return (
    <div className={(contents.length < 2) ? styles.wrapper : styles.codeWrapper }>
      <div className={styles.optionsHeader}>
        {
          contents.map((c, index) => (
            <button key={index} onClick={() => handleClick(index)}>{c.option}</button>
          ))
        }
      </div>
      {multiContents[activeIndex]}
    </div>
  )

}
