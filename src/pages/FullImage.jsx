import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/FullImage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios.js';
import SkeletonFull from "../components/Skeletons/SkeletonFull";

const FullImage = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.warn(error);
                alert('Error getting the image');
            });

        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                goBack();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [id]);

    const imageUrl = !isLoading && data ? data.imageUrl : '';
    const userName = !isLoading && data ? data.user.fullName : 'Anonymous';
    const createdAt = !isLoading && data ? new Date(data.createdAt).toLocaleString() : '';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `http://localhost:8888${imageUrl}`;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const goBack = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <div className={styles.fullImage}>
                <div className={styles.body}>
                    <div className={`${styles.info} ${styles.actions}`}>
                        <ion-icon name="arrow-back-outline" onClick={() => goBack()} />
                        <p className={styles.heading}>Image</p>
                        <ion-icon name="download-outline" onClick={handleDownload} />
                    </div>
                    {isLoading ? (
                        <SkeletonFull />
                    ) : (
                        <div className={styles.image}>
                            <img src={`http://localhost:8888${imageUrl}`} alt="Full Size Image" />
                        </div>
                    )}
                    <div className={styles.info}>
                        {isLoading ? (
                            <p className={styles.heading}>.....</p>
                        ) : (
                            <p className={styles.heading}>Description: <span>"{data.description}"</span></p>
                        )}
                    </div>
                    <div className={styles.info}>
                        <p className={styles.heading}>Author: <span>{userName}</span></p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.heading}>Date(Time) of creation: <span>{createdAt}</span></p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.heading}>Image ID: <span>{id}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullImage;
