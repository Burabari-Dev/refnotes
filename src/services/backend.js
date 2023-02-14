import { techs } from '../test-data/techs';
import { moduleGroups } from '../test-data/module-groups';
import { modules } from '../test-data/modules';
import { paragraphs } from '../test-data/paragraphs';
import { contents } from '../test-data/contents';

const isDevEnv = process.env.NODE_ENV === 'development';

export function getAllTechs() {
  if (isDevEnv) { 
    return techs; 
  }
  //TODO: logic to fetch data from backend
}

export function getTechModuleGroups(techId) {
  if (isDevEnv){
    return moduleGroups.filter(mg => (mg.techId === techId));
  }
  //TODO: logic to fetch data from backend
}

export function getModules(moduleGroupId) {
  if (isDevEnv){
    return modules.filter(m => (m.groupId === moduleGroupId));
  }
  //TODO: logic to fetch data from backend
}

export function getParagraphs(moduleId) {
  if (isDevEnv){
    return paragraphs.filter(p => (p.moduleId === moduleId));
  }
  //TODO: logic to fetch data from backend
}

export function getContents(paragraphId) {
  if (isDevEnv){
    return contents.filter(c => (c.paragraphId === paragraphId));
  }
  //TODO: logic to fetch data from backend
}
