import {useEffect, useState} from "react";
import styles from '../styles/pages/Home.module.css'

export const TypingGreeting = ({ fullName }) => {
    const [index, setIndex] = useState(0);
    const [displayedGreeting, setDisplayedGreeting] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {

            const intervalId = setInterval(() => {
                if (typeof fullName === 'string' && index < fullName.length) {
                    setDisplayedGreeting(fullName.slice(0, index + 1));
                    setIndex(index + 1);
                } else {
                    setDisplayedGreeting(fullName);
                    setIsTypingComplete(true);
                }

            }, 200);


        return () => clearInterval(intervalId);
    }, [index, fullName]);

    return (
        <span className={styles.title}>
            {displayedGreeting}
            {!isTypingComplete && <span style={{color: "#fff", transition: "1s ease-in-out"}} className={styles.cursor}>|</span>}
        </span>
    );
};
