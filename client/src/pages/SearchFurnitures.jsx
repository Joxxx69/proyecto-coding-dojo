import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ShowImage from '../components/showImage';
import './searchfurnitures.css'


const SearchFurnitures = ({}) => {
    const navigate =useNavigate();
    const [search, setSearch]=useState('');
    const [listSearch, setListSearch]=useState([]);

    const SearchSubmit =(e)=>{
        e.preventDefault();
        const valor ={search};
        axios.get(`${process.env.REACT_APP_API_URL}/searchName/${search}`)
        .then(({data})=> {
          setListSearch(data);
          console.log(data);
        })
        .catch(err => console.log('existio un error', err));
        console.log(valor);
    
      }
      const ChangeSearch=(e)=>{
        setSearch(e.target.value)
      }

    return (
        <>
            <div className='offset-3 mb-2'>
                <form className="form-inline my-lg-2" onSubmit={SearchSubmit}>
                    <input className="form-control mr-sm-2 col-7" type="search"  
                    value={search} placeholder="Search" aria-label="Search"
                    onChange={ChangeSearch} name={'search'}
                    />
                    <input className='btn btn-light ml-2'  type="submit" value={'Search'}  />
                </form> 
            </div>
            <div className="conatiner mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <div className="row">
                            {
                                listSearch.map((furniture , idx)=>(
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
}

export default SearchFurnitures;