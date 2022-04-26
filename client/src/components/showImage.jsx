import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ShowImage = ({photoID, furniture}) => {
    const [loaded, setLoaded]= useState(false);
    const {style, infoFurniture} =furniture;
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/photofurniture/${photoID}`)
        .then(()=> setLoaded(true))
        .catch(err => console.log(err))
    },[photoID])
    

    return(
        <div>
        { loaded &&  <img src={`${process.env.REACT_APP_API_URL}/photofurniture/${photoID}`} alt={furniture.nameFurniture|| infoFurniture.nameFurniture} 
                style={style||{maxHeight:'300px', maxWidth:'230px'}}
            />
        }
        </div>
    );
}

export default ShowImage;





