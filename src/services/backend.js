import { techs } from '../test-data/techs';
import { moduleGroups } from '../test-data/module-groups';
import { modules } from '../test-data/modules';
import { paragraphs } from '../test-data/paragraphs';
import { contents } from '../test-data/contents';
//=> FIRESTORE 
import { initializeApp, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcmVgv7qr0JR5WS1um6JEqE8cCP4-glMM",
  authDomain: "refnotes-f3644.firebaseapp.com",
  projectId: "refnotes-f3644",
  storageBucket: "refnotes-f3644.appspot.com",
  messagingSenderId: "694793057846",
  appId: "1:694793057846:web:e53e8f7ca16ef30a87ca97"
};

const isDevEnv = process.env.NODE_ENV === 'development';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(getApp());

// if(location.hostname === 'localhost'){
if(isDevEnv){
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

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

export function getTechModuleGroups(techId) {
  if (isDevEnv) {
    return moduleGroups.filter(mg => mg.techId === techId);
  }
  //TODO: logic to fetch data from backend
  return [];
}

export function getGroupModules(groupId) {
  if (isDevEnv) {
    return modules.filter(m => m.groupId === groupId);
  }
  //TODO: logic to fetch data from backend
  return [];
}
