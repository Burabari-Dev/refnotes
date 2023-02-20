import { useState } from 'react';
import styles from './draggableList.module.css';

export default function DraggableList({ contents = [], setContents, handleClick }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  function handleDragStart(event, index) {
    setDraggedIndex(index);
  }

  function handleDragOver(event, index) {
    event.preventDefault();
    // const items = Array.from(list);
    const items = Array.from(contents);
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(index, 0, draggedItem);
    // setList(items);
    setContents(items);
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
          className={styles.listItem}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={(event) => handleDragOver(event, index)}
          onDragEnd={handleDragEnd}
          onClick={(e) => handleClick(e, item)}
        >
          {/* title -> by design all the list-objects (Tech | Module-Group | Module) would have a title */}
          {item.title}  
        </div>
      ))}
    </div>
  );
}
