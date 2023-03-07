import { useEffect, useRef, useState } from 'react';
import styles from './titlePaper.module.css';
import { CheckIcon, DeleteIcon, EditIcon } from "../../images/get-icon";

export default function TitlePaper({ item, create, update, remove }) {
  const inputRef = useRef(null);
  const initTitle = item?.data?.title;
  const [edit, setEdit] = useState(item === undefined ? true : false);
  const [shiftDown, setShiftDown] = useState(false);
  
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.shiftKey) {
        setShiftDown(true);
      }
    }

    function handleKeyUp(event) {
      if (!event.shiftKey) {
        setShiftDown(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function handleClickEdit() {
    setEdit(true);
  }

  function handleClickCheck() {
    const currentTitle = inputRef.current.value;
    if (item?.id) {
      const _item = { ...item };
      _item.data.title = currentTitle;
      update(_item);
      setEdit(false);
    } else {
      create(currentTitle);  //-> TitlePaper can model Techs, ModuleGroups or Modules so only text is sent. Parent would figure out the rest.
    }
  }

  function handleClickDelete() {
    if (item?.id) {
      remove(item.id);
    }
  }

  return (
    <div className={styles.wraper}>
      {
        edit
          ? <>
            <textarea className={styles.textArea} ref={inputRef} >{initTitle}</textarea>
            <div className={styles.icon} onClick={handleClickCheck}><CheckIcon /></div>
          </>
          : <>
            <div className={styles.txt}>
              {initTitle}
            </div>
            {
              shiftDown
                ? <div className={styles.icon} onClick={handleClickDelete}><DeleteIcon /></div>
                : <div className={styles.icon} onClick={handleClickEdit}><EditIcon /></div>
            }
          </>
      }

    </div>
  )
}
