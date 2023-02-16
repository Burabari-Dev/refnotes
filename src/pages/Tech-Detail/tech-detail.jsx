import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTechDetailsData2, } from '../../services/backend';
import styles from './tech-detail.module.css';

export default function TechDetail() {
  const { techId } = useParams();
  //TODO: logic to get details of this page from techId


  /*
  STRUCTURE OF THE DATA
  {
    moduleGroups: [ {}, {}, {} ],
    modules:      [ {}, {}, {} ],
    contents:     [ [{}], [{}], [{}] ]
  }
  */
  const data2 = getTechDetailsData2(techId);

  const [title, setTitle] = useState(data2.techTitle);
  const [mainMenus, setMainMenus] = useState(data2.moduleGroups);
  const [subMenus, setSubMenus] = useState(data2.modules);
  const [contents, setContents] = useState(data2.contents);

  const [menus, setMenus] = useState(data2.menus);


  return (
    <div className={styles.container}>
      <div className={styles.topBar}>{title}</div>
      <div className={styles.details}>

        <div className={styles.menus}>

          {menus.map(m => {
            if(m.id === undefined)
              return <></>;
            else if (m.id?.startsWith('mg')) {
              return <div className={styles.mainMenu} key={m.id}> {m.title} </div>
            }
            return <div className={styles.subMenu} key={m.id}> {m.title} </div>
          })}
        </div>


        <div className={styles.contentArea}>
          {
            contents.map(c => {
              if (c.length === 0) {
                const C_TYPE = c[0].type;
                const C_Tech = c[0].tech;
                if (C_TYPE === 'CODE') {
                  return <div className={styles.content}> <pre><code> {c[0].data} </code></pre> </div>
                }
                return <div className={styles.content}> {c[0].data} </div>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}
