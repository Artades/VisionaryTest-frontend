import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Preview.module.css';
import { Link } from 'react-router-dom';

const Preview = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(true);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.preview}>
            <div className={styles.body}>
                <div
                    className={`${styles.logo} ${isActive ? styles.active : ''}`}
                >
                    <p>
                        Visi<span>
              <ion-icon name="aperture-outline" />
            </span>nary
                    </p>
                </div>
                <br />
                <p
                    className={`${styles.text} ${isActive ? styles.active : ''}`}
                >
                    Welcome to our app! Sign in or create an account to access all the
                    features.
                </p>
                <br />
                <Link to="/login">
                    <button
                        className={`${styles.button} ${
                            isActive ? styles.active : ''
                        }`}
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Preview;
