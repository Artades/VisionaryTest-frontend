import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/CreateImage.module.css'
import inputStyles from "../styles/components/Input.module.css";
import axios from '../axios'
import {useNavigate} from "react-router-dom";

const CreateImage = () => {
    const[description, setDescription] = useState('');
    const inputFileRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    //Go Back
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/home')
    }
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                goBack();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })
    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            goBack();
        }
    };

    document.addEventListener('keydown', handleKeyDown);

        document.removeEventListener('keydown', handleKeyDown);

    //Handle picking of files
    const handleChangeFile = async (event) => {
        try{
            const formData = new FormData();
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);

        }
        catch (error) {
            console.log(error);
            alert('Error loading preview')
        }
    }
    //Publishing a post
    const imageSubmit =  async () => {
        try{
            setIsLoading(true);
            const fields = {
                description, imageUrl
            }
            const {data} = await  axios.post('/posts', fields);
            const id = data._id;

           navigate(`/home/${id}`)
        }
        catch(error){
            console.log(error);
            alert('Error publishing an image')
        }
    }
    return (
        <div className="container">


        <div className={styles.createImage}>
            <div className={styles.body}>
                <div className={styles.bar}>
                  <div className={styles.actions}>
                      <ion-icon name="arrow-back-outline" onClick={goBack}/>
                      <h1 className={styles.title}>Create Image</h1>
                  </div>
                    <button className={`${styles.button} ${styles.publish}`} onClick={imageSubmit}>Publish</button>
                </div>
                <hr/>
                <div className={styles.form}>
                    <div className={styles.actions}>
                        <button
                            className={`${styles.button} ${styles.preview}`}
                            onClick={() => inputFileRef.current.click()}
                        >Preview</button>

                        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                    {
                        imageUrl &&     (<button className={`${styles.button} ${styles.clear}`} onClick={() => setImageUrl('')}>Clear</button>)
                    }

                    </div>
                    <div className={styles.image}>
                        {
                            imageUrl ? (
                                <img  src={`http://localhost:8888${imageUrl}`} alt="Preview"/>
                            ) :
                                <ion-icon name="document-attach-outline" />
                        }
                    </div>
                    <br/>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description for an image"
                        className={`${inputStyles.input} ${styles.input}`}

                    />

                </div>
             </div>
        </div>
        </div>
    );
};

export default CreateImage;