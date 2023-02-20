import { useState } from 'react';
import DraggableList from '../../features/draggable-list/draggableList';
import InputBox from '../../features/input-box/inputBox';
import styles from './data-page.module.css';
import { techs as technologies } from '../../test-data/techs';
import { getAllTechs, getTechModuleGroups, getGroupModules } from '../../services/backend';

export default function DataPage() {
  const [techs, setTechs] = useState(getAllTechs());
  const [moduleGroups, setModuleGroups] = useState();
  const [modules, setModules] = useState();
  // const [contents, setContents] = useState(technologies);
  //###############################################
  const [selTech, setSelTech] = useState();
  const [selGroup, setSelGroup] = useState();
  const [selModule, setSelModule] = useState();

  function handleTechSelection(e, tech) {
    if(e.ctrlKey){
      alert('controlled')
    }

    setSelTech(tech);
    // if (selTech === null | selTech instanceof undefined)
    //   return;
    const groupedModules = getTechModuleGroups(tech.id);
    // groupedModules.
    setModuleGroups(groupedModules);
    setSelGroup(' ');
    setSelModule(' ');
    setModules();
  }

  function handleGroupSelection(group) {
    setSelGroup(group);
    const mods = getGroupModules(group.id)
    setModules(mods);
    setSelModule(' ');
  }

  function handleModuleSelection(mod) {
    setSelModule(mod);

    //TODO: Fetch module contents from Server.
  }

  return (
    <div className={styles.wrapper}>
      <div tabIndex={1} className={styles.techColumn}>
        <div className={styles.header}>Technologies</div>
        <DraggableList contents={techs} setContents={setTechs} handleClick={handleTechSelection} />
        <InputBox selected={selTech} title={selTech?.title} setData={setSelTech} />
      </div>

      <div tabIndex={2} className={styles.groupColumn}>
        <div className={styles.header}>{selTech?.title}</div>
        <DraggableList contents={moduleGroups} setContents={setModuleGroups} handleClick={handleGroupSelection} />
        <InputBox />
      </div>

      <div tabIndex={3} className={styles.moduleColumn}>
        <div className={styles.header}>{selGroup?.title}</div>
        <DraggableList contents={modules} setContents={setModules} handleClick={handleModuleSelection} />
        <InputBox />
      </div>

      <div tabIndex={4} className={styles.detailsColumn}>
        <div className={styles.header}>{selModule?.title}</div>
        <div className={styles.previewArea}>
          {/* TODO: Array of TextBlocks here! -> Holds paragraphs of text or code.
                  You should be able to add alternates to one code block. */}

        </div>
        <InputBox />
      </div>
    </div>
  )
}
