import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  getDocsFromCache,
  getDoc,
  orderBy
} from "firebase/firestore";
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

const isDevEnv = process.env.NODE_ENV === 'development'  //location.hostname === 'localhost' || location.hostname === '192.168.0.1';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(getApp());

// if(location.hostname === 'localhost'){
if (isDevEnv) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

//-> COLLECTIONS
const techsRef = collection(db, 'technologies');
const groupsRef = collection(db, 'module-groups');
const modulesRef = collection(db, 'modules');
const paragraphsRef = collection(db, 'paragraphs');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TECHNOLOGIES [START] ~~~~~~~~##
export async function addTech(tech) {
  await addDoc(techsRef, tech);
}

export async function updateTech(tech) {
  const docRef = doc(db, 'technologies', tech.id);
  await updateDoc(docRef, tech.data);
}

export async function updateManyTechs(techs) {
  techs.forEach(async t => await updateTech(t));
  return true;
}

export async function deleteTech(techId) {
  //TODO: Perform this in a batch/transaction operation
  // First delete Tech-> Module-Groups
  const groups = await groupsByTechId(techId);
  groups.forEach(async g => await deleteGroup(g.id));
  // Now you can delete Tech
  await deleteDoc(doc(db, 'technologies', techId));
}

export async function allTechs() {
  const q = query(techsRef, orderBy('rank', 'asc'));
  let snapshot = await getDocsFromCache(q);
  if (snapshot.empty) {
    snapshot = await getDocs(q);
  }
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

export async function getTechById(techId) {
  const docRef = doc(db, 'technologies', techId);
  const docSnap = await getDoc(docRef);
  return {id: docSnap.id, data: docSnap.data()};
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TECHNOLOGIES [END] ~~~~~~~~~~##

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GROUPS [START] ~~~~~~~~~~~~~~##
export async function addGroup(group) {
  await addDoc(groupsRef, group);
}

export async function updateGroup(group) {
  const docRef = doc(db, 'module-groups', group.id);
  await updateDoc(docRef, group.data);
}

export async function updateManyGroups(groups) {
  groups.forEach(async g => await updateGroup(g));
  return true;
}

export async function deleteGroup(groupId) {
  //TODO: Perform this in a batch/transaction operation
  // First delete Group-> Modules
  const modules = await modulesByGroupId(groupId);
  modules.forEach(async m => await deleteModule(m.id));
  // Now you can delete Group
  await deleteDoc(doc(db, 'module-groups', groupId));
}

export async function groupsByTechId(techId) {
  const q = query(groupsRef, where('techId', '==', techId), orderBy('rank'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

export async function techGroupedModules(techId) {
  const groups = await groupsByTechId(techId);
  const _groups = groups.map(g => ({ id: g.id, title: g.data.title, type: 'MAIN' }))
  const arr = [..._groups];

  for (const g of _groups) {
    const modules = await modulesByGroupId(g.id);
    const _modules = modules.map(m => ({ id: m.id, title: m.data.title, type: 'SUB' }))
    arr.splice(arr.indexOf(g) + 1, 0, ..._modules);
  }
  return arr;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GROUPS [END] ~~~~~~~~~~~~~~~~##

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES [START] ~~~~~~~~~~~~~##
export async function addModule(module) {
  await addDoc(modulesRef, module);
}

export async function updateModule(module) {
  const docRef = doc(db, 'modules', module.id);
  await updateDoc(docRef, module.data);
}

export async function updateManyModules(modules) {
  modules.forEach(async m => await updateModule(m));
  return true;
}

export async function deleteModule(moduleId) {
  //TODO: Perform this in a batch/transaction operation
  // First delete Module-> Paragraphs
  const paragraphs = await paragraphsByModuleId(moduleId);
  paragraphs.forEach(async p => await deleteParagraph(p.id));
  // Now you can delete Module
  await deleteDoc(doc(db, 'modules', moduleId));
}

export async function modulesByGroupId(groupId) {
  const q = query(modulesRef, where('groupId', '==', groupId), orderBy('rank'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES [END] ~~~~~~~~~~~~~~~##

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PARAGRAPHS [START] ~~~~~~~~~~##
export async function addParagraph(paragraph) {
  await addDoc(paragraphsRef, paragraph);
}

export async function updateParagraph(paragraph) {
  const docRef = doc(db, 'paragraphs', paragraph.id);
  await updateDoc(docRef, paragraph.data);
}

export async function updateManyParagraphs(paragraphs) {
  paragraphs.forEach(async p => await updateParagraph(p));
  return true;
}

export async function deleteParagraph(paragraphId) {
  await deleteDoc(doc(db, 'paragraphs', paragraphId));
}

export async function paragraphsByModuleId(moduleId) {
  const q = query(modulesRef, where('moduleId', '==', moduleId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PARAGRAPHS [END] ~~~~~~~~~~~~##
