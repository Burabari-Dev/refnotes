import { techs } from '../test-data/techs';
import { moduleGroups } from '../test-data/module-groups';
import { modules } from '../test-data/modules';
import { paragraphs } from '../test-data/paragraphs';
import { contents } from '../test-data/contents';

const isDevEnv = process.env.NODE_ENV === 'development';

function getParagraphs(moduleId) {
  return paragraphs.filter(p => p.moduleId === moduleId);
}

export function getAllTechs() {
  if (isDevEnv) {
    return techs;
  }
  //TODO: logic to fetch data from backend
  return [];
}

export function getTechTitle(techId) {
  if (isDevEnv) {
    return techs.find(t => t.id === techId).name;
  }
  //TODO: logic to fetch data from backend
  return '';
}

export function getTechById(techId) {
  if (isDevEnv) {
    return techs.find(t => t.id === techId);
  }
  //TODO: logic to fetch data from backend
  return {};
}


export function getTechModuleMenus(techId) {
  if (isDevEnv) {
    let arr = [];
    const groups = moduleGroups.filter(mg => mg.techId === techId);
    groups.forEach(g => {
      arr.push(g);
      const mods = modules.filter(m => m.groupId === g.id);
      arr.push(...mods);
    })

    return arr;
  }
  //TODO: logic to fetch data from backend
  return [];
}

export function getModuleData(moduleId) {
  if (isDevEnv) {
    const sections = getParagraphs(moduleId);

    return sections.map(s => (
      {
        paragraphId: s.id,
        contents: contents.filter(c => c.paragraphId === s.id)
      })
    )

  }
  //TODO: logic to fetch data from backend
  return [];
}

export function getFirstModuleData(techId) {
  if (isDevEnv) {
    const firstModule = getTechModuleMenus(techId).find(mm => mm.id.startsWith('m0'));  //TODO: Change this atrocity for prod code
    return getModuleData(firstModule?.id);
  }
  //TODO: logic to fetch data from backend
  return [];
}
