import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParagraphViewer from '../../features/paragraph-viewer/paragraphViewer';
import { techGroupedModules, paragraphsByModuleId, getTechById } from '../../services/backend';
import styles from './tech-detail.module.css';

export default function TechDetail() {
  const { techId } = useParams();
  const [tech, setTech] = useState();
  const [moduleMenus, setModuleMenus] = useState([]);
  const [selModule, setSelModule] = useState();
  const [paragraphs, setParagraphs] = useState();

  function handleMenuClick(module) {
    setSelModule(module);
  }

  //-> Effect to get Tech from Tech ID
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTechById(techId);
        setTech(data);
      } catch (error) {
        alert('Error getting Tech by ID', error.message);
      }
    }
    fetchData();
  }, [techId])

  //-> Effect to get Tech's GroupedModules from Tech ID
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await techGroupedModules(techId);
        setModuleMenus(data);

      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, [techId])

  // -> Effect to get Module data whenever Module Menu is clicked
  useEffect(() => {
    async function fetchData() {
      if (!selModule)
        return;
      try {
        const data = await paragraphsByModuleId(selModule.id);
        setParagraphs(data);
      } catch (error) {
        alert('Failed to get Module Data', error.message);
      }
    }
    fetchData();
  }, [selModule])


  return (
    <div className={styles.container}>
      <div className={styles.topBar}>{tech?.data.title}</div>
      <div className={styles.details}>

        <div className={styles.menus}>
          {
            moduleMenus?.map(mm => {
              let isMain = mm.type === 'MAIN';
              return <div
                key={mm.id}
                className={isMain ? styles.mainMenu : styles.subMenu}
                onClick={isMain ? null : () => handleMenuClick(mm)}
                style={(selModule && selModule.id === mm.id) ? { backgroundColor: '#ddd' } : null}
              >{mm.title}
              </div>
            })
          }

        </div>

        <div className={styles.contentArea}>
          {
            paragraphs
              ? paragraphs.map(p => <ParagraphViewer paragraph={p} key={p.id} />)
              : <div className={styles.centered}>Click on a menu to the left to see data.</div>
          }
        </div>
      </div>
    </div>
  )
}
