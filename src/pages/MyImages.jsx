import React, {useEffect} from 'react';
import styles from '../styles/pages/MyImages.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../redux/slices/posts";
import SkeletonImage from "../components/Skeletons/SkeletonImage";
import Image from "../components/Image";
import {useNavigate} from "react-router-dom";
import SkeletonSmall from "../components/Skeletons/SkeletonSmall";
const MyImages = () => {
    const {posts} = useSelector((state) => state.posts);
    const arePostsLoading = posts.status === 'loading';
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    const userData = useSelector((state) => state.auth.data);
//Filtering images which belongs to user
   const userImages = posts.items.filter((image) => {
      return image.user._id === userData._id
   })
    //Go Back
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/home')
    }
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                goBack();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })

    return (
 <div className="container">
     <div className={styles.myImages}>
         <div className={styles.body}>
             <div className={styles.actions}>
                 <ion-icon name="arrow-back-outline" onClick={goBack}/>
                 <h2 className={styles.title}>My Images:</h2>
             </div>

             <div className={styles.images}>
                 {
                     (arePostsLoading ? [...Array([...userImages].length) + 1] : [...userImages]).map((obj, index) =>
                         arePostsLoading ?
                             (<SkeletonSmall />) :
                             (
                                <div className={styles.image}>
                                    <Image
                                        description={obj.description}
                                        imageUrl={obj.imageUrl}
                                        // user={obj.user}
                                        isEditable={userData?._id === obj.user._id}
                                        id={obj._id}
                                        key={index}/>
                                </div>
                                 )
                     )
                 }
             </div>
         </div>
     </div>
 </div>
    );
};

export default MyImages;