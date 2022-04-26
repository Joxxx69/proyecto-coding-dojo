import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRegister from "../components/FormRegister";
import Navbar from "../components/Navbar";
import "../pages/singup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [errors, setErrors]= useState([]);
    const [listUsers, setListUsers]=useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/getAll`)
        .then(({data})=> setListUsers(data))
        .catch(err=> console.log(err))
    },[]);

    console.log(listUsers);
  const RegisterUser = (user) => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, user)
    .then(()=>navigate('/'))
    .catch(err=>{
        const errorResponse= err.response.data.errors;
        const errorArr=[];
        for(const key of Object.keys(errorResponse)){
            errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
    });
  };

  return (
    <>
      <FormRegister onSubmitProp={RegisterUser} listUsers={listUsers} />
    
    </>
  );
};

export default Signup;
