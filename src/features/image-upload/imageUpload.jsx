import { useState } from 'react';
import { uploadImage } from '../../services/backend';
import styles from './imageUpload.module.css';

export default function ImageUpload({ setImageUrl }) {
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUploadImage = async() => {
    if (!image)
      return;
    const url = await uploadImage(image);
    setImageUrl(url);
  }

  return (
    <div className={styles.wrapper}>
      <input type={'file'} onChange={handleImageChange} />
      <button type='button' onClick={handleUploadImage}>Upload Image</button>
    </div>
  )
}
