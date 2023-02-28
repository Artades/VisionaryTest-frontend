import React from 'react';
import styles from '../styles/pages/Auth.module.css';
import inputStyles from '../styles/components/Input.module.css';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../redux/slices/auth";
import {useForm} from "react-hook-form";

const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const { register, handleSubmit,  formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async(values) => {
        const data = await dispatch(fetchAuth(values));

        if(!data.payload) {
            return alert('Failed to authenticate user')
        }
        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token);
        }
    };
    if(isAuth) {
        return <Navigate to="/home"/>
    }
    return (
        <div className={styles.auth}>
            <div className={styles.body}>
                <div className={styles.form}>
                    <form  onSubmit={handleSubmit(onSubmit)} className={styles.formBody}>
                        <h1 className={styles.title}>Sign in</h1>
                        <hr/>
                        <input
                            className={inputStyles.input}
                            error={errors.email?.message}
                            {...register('email', {required: 'Укажите почту'})}
                            type="email" placeholder="johnycap@gfmail.com" />

                        <input
                            className={inputStyles.input}
                            error={errors.password?.message}
                            {...register('password', {required: 'Укажите пaроль'})}
                            type="password" placeholder="Password" />

                        <button  type="submit" className={styles.button}>Enter</button>
<br/>
                        <span style={{ color: 'rgb(226, 224, 255'}}>Don't have an account?  |   <Link style={{ color: 'rgb(51,126,244)'}} to="/register">Join Gallery</Link></span>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;