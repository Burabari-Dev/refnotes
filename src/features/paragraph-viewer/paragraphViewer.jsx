import { useState } from 'react';
import { EditIcon } from '../../images/get-icon';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from './paragraphViewer.module.css';

export default function ParagraphViewer({ paragraph, setIsEditingContent }) {
  const type = paragraph?.data.type;
  const url = (type === 'IMAGE' || type === 'LINK') ? paragraph?.data.contents.url : undefined;
  const caption = (type === 'IMAGE' || type === 'LINK') ? paragraph?.data.contents.caption : undefined;
  const contents = (type === 'TEXT' || type === 'CODE') ? paragraph?.data.contents : undefined;
  const options = (type === 'TEXT' || type === 'CODE') ? Object.keys(paragraph?.data.contents) : [];
  const [selOption, setSelOption] = useState(options[0]);

  function handleSwitch(option) {
    setSelOption(option);
  }

  return (
    <>
    <div className={styles.iconWraper}>
      <div className={styles.icon} onClick={setIsEditingContent ? () => setIsEditingContent(true) : null} ><EditIcon /></div>
    </div>
      <div className={styles.container}>
        {
          type === 'TEXT' || type === 'CODE'
            ?
            <div className={styles.textCode}>
              {
                (options && options.length > 1)
                  ?
                  <div className={styles.top}>
                    <div className={styles.options}>
                      Options:
                      {
                        options.map(
                          (o) => <div
                            className={styles.tab}
                            active={selOption === o ? 'true' : null}
                            key={o}
                            onClick={() => handleSwitch(o)}
                          >{o}</div>)
                      }
                    </div>
                    {/* <div className={styles.icon} onClick={setIsEditingContent ? () => setIsEditingContent(true) : null} ><EditIcon /></div> */}
                  </div>
                  : <></>
              }
              {
                <div>
                  {
                    type === 'CODE'
                      ?
                      <SyntaxHighlighter language={`${selOption}`} style={nord} >{contents[selOption]}</SyntaxHighlighter>
                      :
                      <p>{contents[selOption]}</p>
                  }
                </div>
              }
            </div>
            : <></>
        }

        {
          type === 'IMAGE'
            ?
            <div className={styles.image}>
              <img src={url} alt='' />
              <div>{caption}</div>
            </div>
            : <></>
        }
        {
          type === 'LINK'
            ?
            <div className={styles.link}>
              <a href={url}>{caption}</a>
            </div>
            : <></>
        }
      </div>
    </>
  )
}
