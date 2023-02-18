import { useState } from 'react';
import MultiContent from '../multi-content/multiContent';
import styles from './section.module.css';

export default function Section({ contents = [] }) {
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
