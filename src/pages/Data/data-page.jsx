import { useEffect, useState } from 'react';
import DraggableList from '../../features/draggable-list/draggableList';
import InputBox from '../../features/input-box/inputBox';
import styles from './data-page.module.css';
// import { techs as technologies } from '../../test-data/techs';
import {
  addGroup,
  addTech,
  allTechs,
  deleteGroup,
  deleteTech,
  techGroupedModules,
  groupsByTechId,
  modulesByGroupId,
  paragraphsByModuleId,
  updateGroup,
  updateTech,
  addModule,
  updateModule,
  deleteModule,
  updateManyTechs,
  updateManyGroups,
  updateManyModules,
  updateManyParagraphs
} from '../../services/backend';

export default function DataPage() {
  const [techs, setTechs] = useState([]);
  const [moduleGroups, setModuleGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  //###############################################
  const [selTech, setSelTech] = useState();
  const [selGroup, setSelGroup] = useState();
  const [selModule, setSelModule] = useState();
  const [selParagraph, setSelParagraph] = useState();
  const [loading, setLoading] = useState(false);

  //-> fetching Technologies function
  async function getAllTechs() {
    try {
      const data = await allTechs();
      setTechs(data);
    } catch (error) {
      alert(`data-page.getAllTechs`, error.message);
      console.log(error, error.message);
    }
  }

  //-> fetching Technologies effect
  useEffect(() => {
    getAllTechs();
  }, [])

  //-> fetching Groups effect
  useEffect(() => {
    async function fetchData() {
      if (selTech === undefined || selTech.id === undefined)
        return;
      try {
        const data = await groupsByTechId(selTech.id);
        setModuleGroups(data);
      } catch (error) {
        alert(`Groups Effect`, error.message);
        console.log(error, error.message);
      }
    }
    fetchData();
  }, [selTech])

  //-> fetching Modules effect
  useEffect(() => {
    async function fetchData() {
      if (selGroup === undefined || selGroup.id === undefined)
        return;
      try {
        const data = await modulesByGroupId(selGroup.id);
        setModules(data);
      } catch (error) {
        alert(`Modules Effect`, error.message);
        console.log(error, error.message);
      }
    }
    fetchData();
  }, [selGroup])

  //-> fetching Paragraphs effect
  useEffect(() => {
    async function fetchData() {
      if (selModule === undefined || selModule.id === undefined)
        return;
      try {
        const data = await paragraphsByModuleId(selModule.id);
        setParagraphs(data);
      } catch (error) {
        alert(`Paragraphs Effect`, error.message);
        console.log(error, error.message);
      }
    }
    fetchData();
  }, [selModule])

  function handleTechSelection(tech) {
    setSelModule(undefined);
    setSelGroup(undefined);
    setModules(undefined)
    setModuleGroups(undefined);
    setSelTech(tech);
  }

  function handleGroupSelection(group) {
    setSelModule(undefined);
    setModules(undefined);
    setSelGroup(group);
  }

  function handleModuleSelection(mod) {
    setSelModule(mod);
    //TODO: Fetch module contents from Server.
  }

  async function createTech(title) {
    if (loading || title === undefined || title === null || title?.trim()?.length === 0)
      return;
    const maxRank = techs?.reduce((max, current) => (current.data.rank > max ? current.data.rank : max), 0);
    const tech = {
      title: title,
      rank: maxRank + 1
    }
    setLoading(true);
    await addTech(tech);
    await getAllTechs();
    setLoading(false);
  }

  async function createGroup(title) {
    if (loading || title === undefined || title === null || title?.trim()?.length === 0 || selTech === undefined)
      return;
    const maxRank = moduleGroups?.reduce((max, current) => (current.data.rank > max ? current.data.rank : max), 0);
    const group = {
      title: title,
      rank: maxRank + 1,
      techId: selTech.id
    }
    setLoading(true);
    await addGroup(group);
    const data = await groupsByTechId(selTech?.id);
    setModuleGroups(data);
    setLoading(false);
  }

  async function createModule(title) {
    if (loading || title === undefined || title === null || title.trim().length === 0 || selGroup === undefined)
      return;
    const maxRank = modules?.reduce((max, current) => (current.data.rank > max ? current.data.rank : max), 0);
    const module = {
      title: title,
      rank: maxRank + 1,
      groupId: selGroup.id
    }
    setLoading(true);
    await addModule(module);
    const data = await modulesByGroupId(selGroup?.id);
    setModules(data);
    setLoading(false);
  }

  async function editTech(tech) {
    if (loading || tech === undefined || tech === null)
      return;

    setLoading(true);
    await updateTech(tech)
    await getAllTechs();
    setLoading(false);
  }

  async function editGroup(group) {
    if (loading || group === undefined || group === null)
      return;

    setLoading(true);
    await updateGroup(group)
    const data = await groupsByTechId(selTech?.id);
    setModuleGroups(data);
    setLoading(false);
  }

  async function editModule(module) {
    if (loading || module === undefined || module === null)
      return;

    setLoading(true);
    await updateModule(module)
    const data = await modulesByGroupId(selGroup?.id);
    setModules(data);
    setLoading(false);
  }

  async function removeTech(techId) {
    if (loading || techId === undefined || techId === null || techId.trim().length === 0)
      return;

    setLoading(true);
    await deleteTech(techId);
    await getAllTechs();
    setLoading(false);
  }

  async function removeGroup(groupId) {
    if (loading || groupId === undefined || groupId === null || groupId.trim().length === 0)
      return;

    setLoading(true);
    await deleteGroup(groupId);
    const data = await groupsByTechId(selTech?.id);
    setModuleGroups(data);
    setLoading(false);
  }

  async function removeModule(moduleId) {
    if (loading || moduleId === undefined || moduleId === null || moduleId.trim().length === 0)
      return;

    setLoading(true);
    await deleteModule(moduleId);
    const data = await modulesByGroupId(selGroup?.id);
    setModules(data);
    setLoading(false);
  }


  async function reRankTech() {
    if (loading)
      return;

    const rankedTechs = [...techs];
    rankedTechs.forEach((r, index) => r.data.rank = index);
    setLoading(true);
    await updateManyTechs(rankedTechs)
    await getAllTechs();
    setLoading(false);
  }

  async function reRankGroup() {
    if (loading)
      return;

    const rankedGroups = [...moduleGroups];
    rankedGroups.forEach((g, index) => g.data.rank = index);
    setLoading(true);
    await updateManyGroups(moduleGroups)
    const data = await groupsByTechId(selTech?.id);
    setModuleGroups(data);
    setLoading(false);
  }

  async function reRankModule() {
    if (loading)
      return;
    const rankedModules = [...modules];
    rankedModules.forEach((m, index) => m.data.rank = index);
    setLoading(true);
    await updateManyModules(rankedModules)
    const data = await modulesByGroupId(selGroup?.id);
    setModules(data);
    setLoading(false);
  }

  async function reRankParagraph() {
    if (loading)
      return;

    const rankedParagraphs = [...paragraphs];
    rankedParagraphs.forEach((p, index) => p.data.rank = index);
    setLoading(true);
    await updateManyParagraphs(rankedParagraphs)
    const data = await paragraphsByModuleId(selModule?.id)
    setLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      {
        loading ?
          <div className={styles.loading}> Loading... </div>
          :
          <>
            <div className={styles.techColumn}>
              <div className={styles.header}>Technologies</div>
              <DraggableList
                contents={techs}
                setContents={setTechs}
                handleClick={handleTechSelection}
                create={createTech}
                remove={removeTech}
                update={editTech}
                reRank={reRankTech}
              />
            </div>

            <div className={styles.groupColumn}>
              <div className={styles.header}>{selTech?.data?.title}</div>
              <DraggableList
                contents={moduleGroups}
                setContents={setModuleGroups}
                handleClick={handleGroupSelection}
                create={createGroup}
                remove={removeGroup}
                update={editGroup}
                reRank={reRankGroup}
              />
            </div>

            <div className={styles.moduleColumn}>
              <div className={styles.header}>{selGroup?.data?.title}</div>
              <DraggableList
                contents={modules}
                setContents={setModules}
                handleClick={handleModuleSelection}
                create={createModule}
                remove={removeModule}
                update={editModule}
                reRank={reRankModule}
              />
            </div>

            <div className={styles.detailsColumn}>
              <div className={styles.header}>{selModule?.title}</div>
              <div className={styles.previewArea}>
                {/* TODO: Array of TextBlocks here! -> Holds paragraphs of text or code.
                  You should be able to add alternates to one code block. */}

              </div>
              <InputBox />
            </div>
          </>
      }

    </div>
  )
}
