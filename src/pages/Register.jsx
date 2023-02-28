import React from 'react';
import styles from "../styles/pages/Auth.module.css";
import inputStyles from "../styles/components/Input.module.css";
import {Link, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../redux/slices/auth";

 const Register = () => {
     const isAuth = useSelector(selectIsAuth);
     const dispatch = useDispatch();
     const { register, handleSubmit, formState: { errors, isValid } } = useForm({
         defaultValues: {
             fullName: '',
             email: '',
             password: '',
         },
         mode: 'onChange',
     });

     const onSubmit = async(values) => {
         const data = await dispatch(fetchRegister(values));

         if(!data.payload) {
             return alert('Failed to register user')
         }
         if('token' in data.payload){
             window.localStorage.setItem('token', data.payload.token);
         }
     };

     if(isAuth) {
         return <Navigate to="/login"/>
     }
    return (
        <div className={styles.auth}>
            <div className={styles.body}>
                <div className={styles.form}>
                    <form  onSubmit={handleSubmit(onSubmit)} className={styles.formBody}>
                        <h1 className={styles.title}>Sign up</h1>
                        <hr/>
                        <input type="text"
                               placeholder="John Cap"
                               className={inputStyles.input}
                               error={Boolean(errors.fullName?.message)}
                               helperText={errors.fullName?.message}
                               {...register('fullName', {required: 'Укажите ваше имя'})}
                        />
                        <input type="email"
                               placeholder="johnnycap@gmail.com"
                               className={inputStyles.input}
                               error={Boolean(errors.email?.message)}
                               helperText={errors.email?.message}
                               {...register('email', {required: 'Укажите почту'})}
                        />
                        <input type="password"
                               placeholder="Concat password"
                               className={inputStyles.input}
                               error={Boolean(errors.password?.message)}
                               helperText={errors.password?.message}
                               {...register('password', {required: 'Укажите пaроль'})}
                        />

                        <button type="submit"  className={styles.button}>Enter</button>
                        <br/>
                        <span style={{ color: 'rgb(226, 224, 255'}}>You already have an account?  |   <Link style={{ color: 'rgb(51, 126, 244)'}} to="/login">Log In</Link></span>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;