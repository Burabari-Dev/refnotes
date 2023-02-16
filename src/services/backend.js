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
  if (isDevEnv) {
    return moduleGroups.filter(mg => (mg.techId === techId));
  }
  //TODO: logic to fetch data from backend
}

export function getModules(moduleGroupId) {
  if (isDevEnv) {
    return modules.filter(m => (m.groupId === moduleGroupId));
  }
  //TODO: logic to fetch data from backend
}

export function getParagraphs(moduleId) {
  if (isDevEnv) {
    return paragraphs.filter(p => (p.moduleId === moduleId));
  }
  //TODO: logic to fetch data from backend
}

export function getContents(paragraphId) {
  if (isDevEnv) {
    return contents.filter(c => (c.paragraphId === paragraphId));
  }
  //TODO: logic to fetch data from backend
}

function getTechTitleById(techId){
  if(isDevEnv){
    return getAllTechs().find(at => at.id === techId)?.name;
  }
}

// ################################################ //

/*
Structure of the DATA:
{
  title: string,                -> ModuleGroup Title
  values: [                     -> 
    {
      title: string,            -> Module Title
      values: [                 -> 
        {
          id: string,           -> Paragraph ID
          content: [content]    -> Array of Paragraph Contents
        }
      ]
    }
  ]
}
*/
export function getTechDetailsData(techId) {
  if (isDevEnv) {
    // const tech = techs.find(t => t.id === techId);
    const moduleGroups = getTechModuleGroups(techId);
    const data = moduleGroups.map(mg => (
      {
        title: mg.title, values: (
          getModules(mg.id).map(m => (
            {
              title: m.title, values: (
                getParagraphs(m.id).map(p => (
                  { id: p.id, contents: getContents(p.id) }
                ))
              )
            }
          ))
        )
      }

    ))

    return data;
  }
}


/*
STRUCTURE OF THE DATA
{
  moduleGroups: [ {}, {}, {} ],
  modules:      [ {}, {}, {} ],
  contents:     [ [{}], [{}], [{}] ]
}
 */
export function getTechDetailsData2(techId) {
  if(isDevEnv){
    const moduleGroups = getTechModuleGroups(techId);
    const modules = getModules(moduleGroups[0]?.id);

    const menus = [];

    moduleGroups.forEach(mg => {
      menus.push(mg);
      getModules(mg?.id).forEach(m => menus.push(m))
    })

    const paragraphs = getParagraphs(modules[0]?.id);
    const contents = paragraphs.map(p => ([getContents(p?.id)])) // => Array of array of contents because some contents can have multiple versions
    return {
      techTitle: getTechTitleById(techId),
      menus: menus,
      moduleGroups: moduleGroups, 
      modules: modules,
      contents: contents
    }
  }
}
