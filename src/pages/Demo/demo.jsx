import ContentEditor from '../../features/content-editor/contentEditor';
import PE from '../../features/content-editor/PE';
import PV from '../../features/content-editor/PV';
import styles from './demo.module.css';

export default function Demo() {
  return (
    <div className={styles.container}>
      {/* <ContentEditor /> */}
      <PE paragraph={
        {
          id: '001', data: {
            modueId: 'm001', 
            type: 'TEXT', 
            contents: { Java: 'This is some Java text', Python: 'Pythonians! Here we go!' }
          }
        }
      } />
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
