import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import jwt_decode from 'jwt-decode'
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => {
    // const [auth, setAuth] = useState(false);
    // const [permissions, setPermissions]=useState([]);
    const [cookies, setCookie, removeCookie] =useCookies(['my-login']);
    const navigate =useNavigate();

    const isAuthed =()=>{
        console.log(cookies);
        return cookies.logged_in;
    }

    const hasPermissions =(permission)=>{
        console.log('este es el permiso',permission);
        console.log('estoy en haspermissions')
        return cookies?.permissions?.includes(permission) || false;
    }

    const login =(user)=>{
         return (axios.post(`${process.env.REACT_APP_API_URL}/login`,user)
                .then(res=> {
                    const decodeToken = jwt_decode(res.data);
                    console.log('estos son lo permisos',decodeToken)
                    setCookie('permissions',decodeToken.permissions ,{path:'/'});
                    setCookie('logged_in', true,{maxAge:60});
                    navigate('/')
                    window.location.reload();
                })
                .catch(err=> alert('Error al autenticar')))

    };
    const logout =()=>{
        return new Promise(res=>{
            removeCookie('permissions');
            removeCookie('logged_in');
            window.location.reload();
            res();
        });
    };
    useEffect(()=>{
        isAuthed();
    },[isAuthed]);
    
    return{ isAuthed, login, logout, hasPermissions };
}

export function AuthProvider({children}){
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export default function AuthConsumer() {
    return useContext(AuthContext);
};
