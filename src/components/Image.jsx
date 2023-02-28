import React from 'react';
import styles from '../styles/components/Image.module.css'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../redux/slices/posts";

const Image = ({description, imageUrl, id, isEditable}) => {
    const dispatch = useDispatch();

 const removeImage = () => {
     if(window.confirm('Are you sure you want to log out ?')) {
         dispatch(fetchRemovePost(id))
     }
 }
    return (
        <div className={styles.image} key={id} style={{backgroundImage: `${process.env.REACT_APP_API_URL}${imageUrl})`}} >
            <div className={styles.body}>
                {
                    isEditable && (
                        <div className={styles.action}>
                            <ion-icon name="trash-outline" onClick={removeImage}></ion-icon>
                        </div>
                    )
                }
                <div className={styles.footer}>
                    <p className={styles.description}>{description}</p>
                    <Link to={`/home/${id}`}><ion-icon name="chevron-up-outline"></ion-icon></Link>
                </div>
            </div>
        </div>
    );
};

export default Image;