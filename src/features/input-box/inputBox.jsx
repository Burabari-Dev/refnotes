import { useState } from 'react';
import styles from './inputBox.module.css';

export default function InputBox({ selected, title, addData, setData: updateData }) {
  const [text, setText] = useState(title);

  // function changeHandler(txt) {
  //   setText(txt);
  // }

  function setValue() {
    let _selected = {...selected};
    _selected.title = text;
    updateData(_selected);
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        // value={title}
        defaultValue={title}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />

      <button type='button' onClick={setValue} style={{ fontSize: 12 }} >
        {(selected && selected.id) ? 'SAVE' : 'ADD'}
      </button>
    </div>
  )
}



// function IB({ selected, setData }) {
//   // const [text, setText] = useState(selected?.title);
//   // const [obj, setObj] = useState(selected?.text);

//   function changeHandler(txt) {
//     let _obj = { ...selected };
//     _obj.title = txt;
//     setData(_obj);
//   }

//   function setValue() {
//     setData(selected);
//   }

//   return (
//     <div className={styles.wrapper}>
//       <textarea
//         value={selected?.title}
//         onChange={(e) => changeHandler(e.target.value)}
//         rows={4}
//       />

//       <button type='button' onClick={setValue} style={{ fontSize: 12 }} >
//         {(selected && selected.id) ? 'ADD' : 'SAVE'}
//       </button>
//     </div>
//   )
// }
