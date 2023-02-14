import { moduleGroups } from '../test-data/module-groups';
import { techs } from '../test-data/techs';

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
