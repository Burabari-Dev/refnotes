import { useState } from 'react';
import ParagraphEditor from '../paragraph-editor/paragraphEditor';
import styles from './draggableParagraphs.module.css';

export default function DraggableParagraphs({ paragraphs=[], setParagraphs, handleClick, create, remove, update, reRank }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  function handleDragStart(event, index) {
    setDraggedIndex(index);
  }

  function handleDragOver(event, index) {
    event.preventDefault();
    const items = Array.from(paragraphs);
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);
    setParagraphs(items);                             //-> SetContents at parent level
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    reRank();
  }


  return (
    <div className={styles.listContainer}>
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={(event) => handleDragOver(event, index)}
          onDragEnd={handleDragEnd}
          onClick={() => handleClick(paragraph)}
        >
          <ParagraphEditor paragraph={paragraph} create={create} update={update} remove={remove} />
        </div>
      ))}
      {/* This last ParagraphEditor is solely for creating new items */}
      <ParagraphEditor create={create} update={update} remove={remove} />
    </div>
  );
}
