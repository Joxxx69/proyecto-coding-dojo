import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShowImage from "../components/showImage";
import './furniturePrices.css'

const FurniturePrice = () => {
    
    const [listFurnitures, setListfurnitures]= useState([])
    const [searchRange, setSearchRange]=useState({
        categories:[],
        categoryId:'',
        upperLimit:'',
        lowerLimit:''
    });
    const {categories,upperLimit,lowerLimit,categoryId} = searchRange

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
        .then(({data})=> setSearchRange({...searchRange, categories: data}))
        .catch(err=> console.log('ocurrio un error',err));
    },[]);

    const SearchChange =(e)=>{
        setSearchRange({...searchRange, [e.target.name]:e.target.value})
    }
    

    const RangeSubmit =(e)=>{
        e.preventDefault();
        const envio ={lowerLimit, upperLimit, categoryId}
        console.log(envio);
        axios.get(`${process.env.REACT_APP_API_URL}/range/${lowerLimit}/${upperLimit}/${categoryId}`)
        .then(({data})=>setListfurnitures(data))
        .catch(err=> console.log('hubo un error', err))

    }

  return (
    <>
      <div className="conatiner mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2 className="mb-4">ange search</h2>

            <form className="mb-3" onSubmit={RangeSubmit}>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label className="text-muted">Upper limit</label>
                  <input  type={"text"} className="form-control" name="upperLimit" value={upperLimit} onChange={SearchChange}/>
                </div>
                <div className="form-group col-md-3">
                  <label className="text-muted">Lower limit</label>
                  <input type={'text'} className="form-control" name={'lowerLimit'} value={lowerLimit} onChange={SearchChange}/>
                </div>
                <div className="form-group col-md-3">
                  <label className="text-muted">Category</label>
                  <select
                      onChange={SearchChange}
                    type="text"
                    className="form-control"
                    name={"categoryId"}
                  >
                    <option>Select Category</option>
                    {categories &&
                    categories.map((category, idx) => (
                      <option key={idx} value={category._id}>
                        {category.nameCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                className="btn btn-primary"
                value={"Search Furniture"}
                type={"submit"}
              />
            </form>
            <div className="row">
                {
                    listFurnitures.map((furniture , idx)=>(
                        <div className='col-lg-4 col-md-6 col-sm-6' key={idx}>
                            <div className='card m-10 mt-2 card-cont'>
                                <ShowImage className={'img'} photoID={furniture._id} furniture={furniture}></ShowImage>
                                <p className='font-weight-bold text-uppercase' >{furniture.nameFurniture}</p>
                                <p className='font-weight-bold' > Price: {furniture.price}$ </p>
                                <Link to={`/view/furniture/${furniture._id}`} className={'btn btn-outline-primary'}>Ver mas</Link>
                            </div>
                        </div>
                    ))
                }

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FurniturePrice;
