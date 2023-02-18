import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../../features/section/section';
import { getFirstModuleData, getModuleData, getTechById, getTechModuleMenus } from '../../services/backend';
import styles from './tech-detail.module.css';

export default function TechDetail() {
  const { techId } = useParams();
  //TODO: logic to get details of this page from techId

  const [moduleData, setModuleData] = useState(getFirstModuleData(techId));
  const tech = getTechById(techId);
  const moduleMenus = getTechModuleMenus(techId);

  function handleMenuClick(menuId) {
    // const menuId = e.target.value.id;
    const data = getModuleData(menuId);
    setModuleData(data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>{tech.name}</div>
      <div className={styles.details}>

        <div className={styles.menus}>
          {
            moduleMenus.map(mm => {
              if (mm.type === 'MAIN') {
                return <div className={styles.mainMenu} key={mm.id}> {mm.title} </div>
              } else {
                return <div className={styles.subMenu} key={mm.id} onClick={() => handleMenuClick(mm.id)} > {mm.title} </div>
              }
            })
          }

        </div>

        <div className={styles.contentArea}>
          {
            moduleData.map(p => <Section contents={p.contents} key={p.paragraphId} />)
          }
        </div>
      </div>
    </div>
  )


}
