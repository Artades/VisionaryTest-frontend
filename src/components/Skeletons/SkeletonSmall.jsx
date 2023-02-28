import React from 'react';
import styles from '../../styles/components/SkeletonSmall.module.css'
const SkeletonImage = () => {
    return (
        <div className={styles.image}>
            <div className={styles.body}>

            </div>
        </div>
    );
};

export default SkeletonImage;