import React from 'react';
import styles from '../src/NotFound.module.css'
const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <h1>404 Page Not Found</h1>
            <p>We couldn't find what you're looking for.</p>
        </div>
    );
};

export default NotFound;