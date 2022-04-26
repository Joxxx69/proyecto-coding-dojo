import axios from 'axios';
import React from 'react';
import FormLogin from '../components/FormLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar';

const Signin = (params) => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {state} = useLocation();
    

    // console.log('este es el state', state);
    

    const LoginUser =(user)=>{
        // axios.post(`${process.env.REACT_APP_API_URL}/login`,user)
        // .then(()=> {
        //     console.log('se registro correctamente');
            // login().then(()=>{
            //     navigate(state?.path || '/');

        //     })
        //     navigate('/');
        // })
        // .catch(err=> console.log(err))
        // console.log(user)
        login(user)
        .then(()=>{
            console.log('se envio')
            navigate(state?.path || '/');
        })
        .catch(err=> alert('error en el login'));
    }

    return (
        <>
            <FormLogin onSubmitProp={LoginUser} />
        
        </>

    
    );
}


export default Signin;