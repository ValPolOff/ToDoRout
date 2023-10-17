"use client"
import { useState } from 'react'
import s from './Auth.module.css'
import { useCreateLoginMutation, useCreateUserMutation, useGetCheckQuery } from '../api/api'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import { data } from 'autoprefixer';
import { getToken, isAuth, setToken } from '../store/token';
import React, {useEffect ,ReactNode} from 'react';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';



export default function Auth () {
    
    const [auth,setAuth] = useState(true)
    const [email, setImail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [createUser,data] = useCreateUserMutation()
    const [createLogin,data2] = useCreateLoginMutation()

    const route = useRouter()
    const clisk = () => {
        if (auth) {
            createUser({email:email,password:password});
            setTimeout(()=> {if (data){
            route.push('/app/task')}},500)
            

        } else {

            createLogin({email:email,password:password});
            setTimeout(()=> {if (data2){
                route.push('/app/task')}},500)
        }
    }
    console.log(data2)
    useEffect(()=>{
        if (data?.data){
        setToken(data.data?.token)}
    },[data.data])
    useEffect(()=>{
        if (data2?.data){
        setToken(data2.data?.token)}
    },[data2.data])
    //console.log(jwt_decode(data.data?.token))
    //const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error

    /*const Auth = async (data) => {
        await createUser({email:data.email,password:password})
    }*/


    return(
        <div className={s.auth}>
            {auth ? 'Registrarion':'Log In' }
            <input className={s.inp} placeholder="Введите email" value={email} onChange={(e)=> setImail(e.target.value) }></input>
            <div className={s.password}>
                <input type={visible ? "password":''} className={s.inp} placeholder="Введите password" value={password} onChange={(e)=> setPassword(e.target.value)}>
                </input>
  
                    <button className={s.visiblePassword} onClick={()=>{setVisible(visible?false:true)}}>
                        {visible ? <VisibilityOffIcon fontSize="small"></VisibilityOffIcon> :<VisibilityIcon fontSize="small"></VisibilityIcon>  }
                    </button>
                    
            </div>

            
            
                <button className={s.but} onClick={()=>{clisk()}}>{auth ? 'Registrarion':'Log In' }
                </button>
            
            <div className={s.errorLoginRegistration}>
                {auth ? data?.error?.data?.message : data2?.error?.data?.message}
            </div>
            <a  onClick={() => {auth ? setAuth(false): setAuth(true)}}>{auth ? 'Log In': 'Registrarion'}</a>
            <button></button>
            
        </div>
    )
}