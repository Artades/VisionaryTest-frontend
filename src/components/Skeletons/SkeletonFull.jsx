import React from 'react';
import styles from '../../styles/components/SkeletonFull.module.css'
const SkeletonImage = () => {
    return (
        <div className={styles.image}>
            <div className={styles.body}>

            </div>
        </div>
    );
};

export default SkeletonImage;