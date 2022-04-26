import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowImage from '../components/showImage';

const FurnitureView = () => {
    const {furnitureID} = useParams()
    const [infoFurniture, setInfoFurniture]= useState([]);
    const [woods, setWoods]=useState([]);

    const style ={'maxHeight':'500px', 'maxWidth':'500px'}
    const furniture ={style, infoFurniture}

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/furniture/${furnitureID}`)
        .then(({data})=> {
            setInfoFurniture(data);
            setWoods(data.woods)
            console.log(data.woods);
        })
        .catch(err=> console.log('existio un error', err))
    },[]);
    console.log(infoFurniture);
    return(
        <div className=' offset-4'>
            <div className='col-lg-6 col-md-6 col-sm-6'>
                <div className='card m-10 mt-2 card-cont' >
                    <ShowImage photoID={infoFurniture._id} furniture={furniture}></ShowImage>
                    <h3 className='font-weight-bold text-uppercase' >{infoFurniture.nameFurniture}</h3>
                    <div className='card offset-3'style={{width:'18rem'}}>
                        <p className='font-weight-bold list-group-item h4' >Price: {infoFurniture.price} $</p>
                    </div>
                    <h4 className='offset-2 text-left font-weight-bold'>Specifications:</h4>
                    <div className='card offset-3'style={{width:'18rem'}}>
                        <p className='font-weight-bold list-group-item h5' >Deph: {infoFurniture.depth} cm</p>
                        <p className='font-weight-bold list-group-item h5' >Height: {infoFurniture.height} cm</p>
                        <p className='font-weight-bold list-group-item h5' >Length: {infoFurniture.length} cm</p>
                        <p className='font-weight-bold list-group-item h5' >Weight: {infoFurniture.weight} cm </p>
                    </div>
                    <h4 className='offset-2 text-left font-weight-bold'>Woods:</h4>
                    <div className='card offset-3' style={{width:'18rem'}}>
                        <ul className="list-group ">
                            {
                                woods.map((wood,idx)=>(
                                    <li className='list-group-item' key={idx}>
                                        <p className='font-weight-bold text-uppercase h5' > {wood}</p>
                                    </li>
                                ))
                            }

                        </ul>

                    </div>

                </div>

            </div>

        </div>
    );

}

export default FurnitureView;