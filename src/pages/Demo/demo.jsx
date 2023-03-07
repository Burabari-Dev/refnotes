import ParagraphEditor from '../../features/paragraph-editor/paragraphEditor';
// import ParagraphViewer from '../../features/paragraph-viewer/paragraphViewer';
import styles from './demo.module.css';

export default function Demo() {
  return (
    <div className={styles.container}>
      <ParagraphEditor />
      {/* <ContentEditor /> */}
      {/* <PE paragraph={
        {
          id: '001', data: {
            modueId: 'm001', 
            type: 'TEXT', 
            contents: { Java: 'This is some Java text', Python: 'Pythonians! Here we go!' }
          }
        }
      } /> */}
      {/* <PV paragraph={
        {
          id: '001', data: {
            modueId: 'm001', 
            type: 'TEXT', 
            contents: { Java: 'This is some Java text', Python: 'Pythonians! Here we go!' }
          }
        }
      } /> */}
    </div>
  )
}
