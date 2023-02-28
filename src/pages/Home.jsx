import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Home.module.css'
import {selectIsAuth} from "../redux/slices/auth";
import Header from "../components/Header";
import {TypingGreeting} from "../components/TypingGreeting";

import Images from "../components/Images";
import {useSelector} from "react-redux";
import Overlay from "../components/Overlay";
import Preview from "../components/Preview";


const Home = () => {
    //Greeting rendering
    const [greeting, setGreeting] = useState('');
    //Data rendering
    const data = useSelector((state) => state.auth.status === 'loaded' ? state.auth.data : 'not loaded');
    const {posts} = useSelector((state) => state.posts);
    const arePostsLoading = posts.status === 'loading';
    // Realising sunset and sunrise time in user's location and showing relevant Greeting
    const now = new Date();
    const currentTime = now.getTime();
    const sunriseTime = new Date();
    sunriseTime.setHours(6);
    sunriseTime.setMinutes(0);
    sunriseTime.setSeconds(0);
    const sunsetTime = new Date();
    sunsetTime.setHours(18);
    sunsetTime.setMinutes(0);
    sunsetTime.setSeconds(0);
    const isSunrise = currentTime >= sunriseTime.getTime() && currentTime < sunsetTime.getTime() - 30 * 60 * 1000;
    const isSunset = currentTime >= sunsetTime.getTime() - 30 * 60 * 1000 && currentTime < sunriseTime.getTime() + 12 * 60 * 60 * 1000;
    useEffect(() => {
        if (isSunrise) {
            setGreeting("What's up, ");
        } else {
            setGreeting("Good evening, ");
        }
    }, [isSunrise, isSunset]);


    //Checking if user's authenticated
    const isAuth = useSelector(selectIsAuth);
    //Burger menu open property toggling
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const[newAtFirst, setNewAtFirst] = useState(false)
    return (
        <>
            <div className="container">
                <div className={styles.home}>
                    <div className={styles.body}>
                        {isAuth ? (
                            <>
                                <Header/>
                                <div className={styles.bar}>
                                    <h2 className={styles.title}>{greeting} <TypingGreeting fullName={data.fullName}/>

                                    </h2>

                                   <div>
                                       <ion-icon name="swap-vertical-outline" onClick={() => {
                                           setNewAtFirst(!newAtFirst)
                                       }
                                       }></ion-icon>
                                       <ion-icon name="reorder-three-outline"
                                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                                       />
                                   </div>
                                </div>
                                <br/>
                                <h3 className={styles.heading}>Today's popular:</h3>
                                <br/>
                                <main className={styles.main}>
                                   <div className={styles.mainBody}>
                                       <Images
                                           arePostsLoading={arePostsLoading}
                                           posts={posts}
                                           orderOfTheImages={newAtFirst}
                                                                               />
                                   </div>
                                </main>
                                <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                            </>


                        ) : (
                         <Preview/>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Home;

