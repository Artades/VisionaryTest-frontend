import React, {useEffect} from 'react';
import styles from "../styles/pages/Home.module.css";
import SkeletonImage from "./Skeletons/SkeletonImage";
import Image from "./Image";
import {fetchPosts} from "../redux/slices/posts";
import {useDispatch, useSelector} from "react-redux";

const Images = ({posts, arePostsLoading, orderOfTheImages}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
const userData = useSelector((state) => state.auth.data);
console.log(userData)
    return (
        <div className={styles.images}>
            <div className={styles.imagesBody} style={{flexDirection: orderOfTheImages ? 'column-reverse' : 'column'}} >

                {
                    !Array.isArray(posts.items) ?

                    (arePostsLoading ? [...Array(posts.items.length) + 1] : posts.items).map((obj, index) =>
                    arePostsLoading ?
                    (<SkeletonImage key={index} />) :
                    (<Image
                    key={index}
                    description={obj.description}
                    imageUrl={obj.imageUrl}
                    // user={obj.user}
                    isEditable={userData?._id === obj.user._id}
                    id={obj._id}
                    />)
                    )
                        :
                        []
                }
            </div>
        </div>
    );
};

export default Images;