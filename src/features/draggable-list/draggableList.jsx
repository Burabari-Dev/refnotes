import { useState } from 'react';
import TitlePaper from '../title-paper/titlePaper';
import styles from './draggableList.module.css';

export default function DraggableList({ contents=[], setContents, handleClick, create, remove, update }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  function handleDragStart(event, index) {
    setDraggedIndex(index);
  }

  function handleDragOver(event, index) {
    event.preventDefault();
    const items = Array.from(contents);
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);
    setContents(items);                             //-> SetContents at parent level
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }


  return (
    <div className={styles.listContainer}>
      {contents.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={(event) => handleDragOver(event, index)}
          onDragEnd={handleDragEnd}
          onClick={() => handleClick(item)}
        >
          <TitlePaper item={item} create={create} remove={remove} update={update} />
        </div>
      ))}
      {/* This last TitlePaper is solely for creating new items */}
      <TitlePaper create={create} remove={remove} update={update} />
    </div>
  );
}
