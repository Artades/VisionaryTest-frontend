import React from 'react';
import styles from '../styles/components/Overlay.module.css'
import {Link} from "react-router-dom";
const Overlay = ({isMenuOpen, setIsMenuOpen}) => {
    return (
        <div className={styles.menu} style={{height: isMenuOpen ? '100%' : 0}} >
            <div className={styles.body}>
                <p className={styles.close}>
                    <ion-icon name="close-outline" onClick={() => setIsMenuOpen(!isMenuOpen)}/>
                </p>
                <div className={styles.logo}>
                    <p>Visi<span><ion-icon name="aperture-outline"/></span>nary</p>
                </div>
                <hr/>
                <ul className={styles.list}>
                    <li><ion-icon name="home-outline"/>  <span>Home</span></li>
                    <Link to="/create-image"><li><ion-icon name="add-outline"/> <span>Create Image</span></li></Link>
                    <Link to="/my-images"><li><ion-icon name="albums-outline"/> <span>My Images</span></li></Link>
                </ul>
            </div>
        </div>
    );
};

export default Overlay;