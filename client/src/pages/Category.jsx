import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCategory from '../components/FormCategory';
import Navbar from '../components/Navbar';

const CreateCategory = () => {
    const navigate =useNavigate();
    const [listCategory, setListCategory]=useState([]);

    const categoryCreate =(category)=>{
        axios.post(`${process.env.REACT_APP_API_URL}/createCategory`, category)
        .then(()=>navigate('/'))
        .catch(err=> console.log('no se pudo crear la categoria', err));

    }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
        .then(({data})=>setListCategory(data))
        .catch(err=> console.log('exitio un error al listar las categorias', err))
    },[]);

    console.log(listCategory)


    return( 

        <>
            <FormCategory  onSubmitProp={categoryCreate} listCategory={listCategory} />
        </>
    );
}

export default CreateCategory;






