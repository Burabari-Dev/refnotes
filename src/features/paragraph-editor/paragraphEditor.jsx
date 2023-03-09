import { useState, useEffect } from 'react';
import { CheckIcon, DeleteIcon } from '../../images/get-icon';
import ImageUpload from '../image-upload/imageUpload';
import ParagraphViewer from '../paragraph-viewer/paragraphViewer';
import styles from './paragraphEditor.module.css';

export default function ParagraphEditor({ paragraph, create, update, remove }) {
  // const moduleId = paragraph?.data.moduleId;
  const [selectedType, setSelectedType] = useState(paragraph ? paragraph.data.type : '');
  const [selectedOption, setSelectedOption] = useState(paragraph ? Object.keys(paragraph.data.contents)[0] : 'NONE')
  const [selectedText, setSelectedText] = useState(paragraph ? Object.values(paragraph.data.contents)[0] : '')
  const [contents, setContents] = useState(paragraph ? paragraph.data.contents : {});
  const [options, setOptions] = useState(paragraph ? Object.keys(paragraph?.data.contents) : []);
  const [isEditingContent, setIsEditingContent] = useState(paragraph ? false : true);

  function persistParagraph() {
    if (paragraph) {
      let _paragraph = { ...paragraph };
      _paragraph.data.type = selectedType;
      _paragraph.data.contents = contents;
      update(_paragraph);
    } else {
      let _paragraph = {};
      // _paragraph.moduleId = moduleId;
      _paragraph.type = selectedType;
      _paragraph.contents = contents;
      create(_paragraph);
    }
  }

  function handleDelete() {
    if (paragraph) {
      remove(paragraph.id);
    }
  }

  function handleTypeChange(e) {
    setSelectedType(e.target.value);
  }

  function handleOptionChange(e) {
    const newOption = e.target.value;

    setSelectedOption(newOption);
    setSelectedText(contents[newOption]);
  }

  function saveTextOrCode(text) {
    setSelectedText(text);
    let _contents = { ...contents };

    const onlyTextOrCodeEntries = Object.entries(_contents).filter(e => !(e[0] === 'url' || e[0] === 'caption'));
    const onlyTextOrCode = Object.fromEntries(onlyTextOrCodeEntries);

    onlyTextOrCode[selectedOption] = text;       //-> New content is created here!
    setContents(onlyTextOrCode);
  }

  function saveLinkOrImage(url, caption) {
    const _contents = { url: url, caption: caption };
    setContents(_contents);
  }

  function addOption(opt) {
    const _options = [...options, opt].filter(o => o !== 'NONE'); //-> When specifying or adding option, delete NONE option.
    setOptions(_options);
    setSelectedOption(opt);

    let _contents = { ...contents };
    delete _contents['NONE'];                                     //-> Also delete the NONE property in contents.
    setContents(_contents);
  }

  function removeOption() {
    let _options = [...options];
    let filtered = _options.filter(o => o !== selectedOption);
    setOptions(filtered);

    let _content = { ...contents };
    delete _content[selectedOption];
    setContents(_content);

    setSelectedOption(options[0]);
  }

  return (
    isEditingContent
      ?
      <div className={styles.container}>
        <div className={styles.top}>

          <Types selectedType={selectedType} handleTypeChange={handleTypeChange} />

          <Options
            options={options}
            selectedType={selectedType}
            handleOptionChange={handleOptionChange}
            addOption={addOption}
            removeOption={removeOption} />

          <div className={styles.controls}>
            <div className={styles.icon} onClick={persistParagraph}><CheckIcon /></div>
            <div className={styles.icon} onClick={handleDelete}><DeleteIcon /></div>
          </div>

        </div>

        <Contents
          selectedType={selectedType}
          contentText={selectedText}
          saveContentText={saveTextOrCode}
          saveLinkOrImage={saveLinkOrImage} />

      </div>
      :
      <ParagraphViewer paragraph={paragraph} setIsEditingContent={setIsEditingContent} />
  )
}

function Types({ selectedType, handleTypeChange }) {
  return (
    <div className={styles.types}>
      <label>
        <input
          type="radio"
          value="TEXT"
          checked={selectedType === "TEXT"}
          onChange={handleTypeChange}
        />
        Text
      </label>
      <label>
        <input
          type="radio"
          value="CODE"
          checked={selectedType === "CODE"}
          onChange={handleTypeChange}
        />
        Code
      </label>
      <label>
        <input
          type="radio"
          value="IMAGE"
          checked={selectedType === "IMAGE"}
          onChange={handleTypeChange}
        />
        Image
      </label>
      <label>
        <input
          type="radio"
          value="LINK"
          checked={selectedType === "LINK"}
          onChange={handleTypeChange}
        />
        Link
      </label>
    </div>
  )
}

function Options({ options, selectedType, selectedOption, handleOptionChange, addOption, removeOption }) {
  const [newOption, setNewOption] = useState(selectedOption ? selectedOption : '');
  return (
    <>
      {
        selectedType === 'TEXT' || selectedType === 'CODE'
          ?
          <div className={styles.options}>
            Options:
            <select value={selectedOption} onChange={handleOptionChange}>
              {
                options.map((o, index) => <option key={index} value={o}>{o}</option>)
              }
            </select>
            <div className={styles.icon} onClick={removeOption}><DeleteIcon /></div>
            <input
              type={'text'}
              placeholder='add option'
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addOption(newOption);
                }
              }} />
            <button type='button' onClick={() => addOption(newOption)} >+</button>
          </div>
          : <></>
      }
    </>
  )
}

function Contents({ selectedType, contentText, saveContentText, url, caption, saveLinkOrImage, setIsEditingContent }) {
  const [text, setText] = useState(contentText ? contentText : 'Dude');   //-> TEXT | CODE
  const [newUrl, setNewUrl] = useState(url ? url : '');                   //-> IMAGE | LINK
  const [newCaption, setNewCaption] = useState(caption ? caption : '');   //-> IMAGE | LINK

  function saveTextAndCode() {
    saveContentText(text);
  }

  function saveUrlAndCaption() {
    saveLinkOrImage(newUrl, newCaption);
  }

  useEffect(() => {
    setText(contentText ? contentText : '');
  }, [contentText])

  return (
    <>
      {
        selectedType === 'TEXT' || selectedType === 'CODE'
          ?
          <div className={styles.editor}>
            <textarea
              className={styles.textArea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                  e.preventDefault();
                  saveTextAndCode();
                }
              }} />
            <button className={styles.btn} type='button' onClick={saveTextAndCode}>{`Save ${selectedType}`}</button>
          </div>
          :
          <div
            className={styles.imageInput}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                saveUrlAndCaption();
              }
            }}  >
            {
              selectedType === 'IMAGE' && <ImageUpload setImageUrl={setNewUrl} />
            }
            <div className={styles.row}>
              <div className={styles.column}>
                <input type={'text'} placeholder={`${selectedType} url`} value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                <input type={'text'} placeholder={`${selectedType} caption`} value={newCaption} onChange={(e) => setNewCaption(e.target.value)} />
                <button className={styles.btn} type='button' onClick={saveUrlAndCaption}>{`Save ${selectedType}`}</button>
              </div>
            </div>
          </div>
      }
    </>
  )
}


