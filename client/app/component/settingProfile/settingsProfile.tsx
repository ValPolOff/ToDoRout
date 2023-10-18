"use client"
import jwt_decode from'jwt-decode'
import s from './SettingsProfile.module.css'
import { useGetTaskQuery, useUpdateUserMutation } from '../api/api'
import { getToken, removeToken } from '../store/token'
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SettingsProfile () {
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const page = 1
    const sort = 'ASK'
    const pageAndSort = {page,sort}
    const {isLoading, data } = useGetTaskQuery(pageAndSort)
    const jwtDec = () => {
        return jwt_decode<{email:string,id:number,role:string}>(getToken() || '{}')
    }

    const [updateUser,error] = useUpdateUserMutation()
    //@ts-ignore
    const errors = error?.error?.data?.message;
    const notify = () => toast.success(`You updated your password`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      const notify2 = () => toast.error(`${errors}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    return (
        
        <div className={s.settings}>
            <ToastContainer />
            <div className={s.settigsRow}>
                
            <div className={s.updateInfoPanel}>
                    <div className={s.headersSettings}>Info about User</div>
                    <div>{`Email: ${jwtDec().email}`}</div>
                    <div>{`id: ${jwtDec().id}`}</div>
                    <div>{`Total number of tasks: ${data?.count}`}</div>
                    <Link href='/app/login'>
                        <button className={s.exit} onClick={removeToken}>
                    <LogoutIcon />
                    LogOut</button>
                     </Link>
                </div>
                <div className={s.updateInfoPanel}>
                <div className={s.headersSettings}>Change password</div>
                    <div className={s.updateInfoPanel}>
                        <div>Old password</div>
                        <input className={s.updateInfo} placeholder='Enter old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
                        <div>New password</div>
                        <input className={s.updateInfo} placeholder='Enter new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                        {//@ts-ignore
                        error?.error?.data?.message
                        }
                        
                    </div> 
                      <button className={s.exit} onClick={() => {errors ? notify2() : notify(), updateUser({email:jwtDec().email ,password:oldPassword, newPassword:newPassword})}}>Update password</button> 
                </div>
                
            </div>
            
 
        
        

        </div>
    )
}