import React, { useEffect } from 'react';
import '../sliderCards/card.css'
import ShowImage from '../showImage';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

const CardFurnitures = ({listFurniture,listCategories}) => {

    return(
        <>

            {
                listCategories.map((category,idx)=>(
                    <motion.div className='slider-container container' key={idx}>
                        <h2 className='font-weight-bold text-uppercase '>
                            <Link to={'/'} className={'text-decoration-none'}>{category.nameCategory}</Link>
                        </h2>
                        <motion.div className='slider' drag={'x'} dragConstraints={{right:0,left:-373}}>
                            {
                                listFurniture.filter(seccion=> seccion.category.nameCategory === category.nameCategory).map((furniture , idx)=>(
                                    <motion.div className='col-lg-4 col-md-6 col-sm-6' key={idx}>
                                        <div className='card m-10 mt-2 card-cont'>
                                            <ShowImage className={'img'} photoID={furniture._id} furniture={furniture}></ShowImage>
                                            <p className='font-weight-bold text-uppercase' >{furniture.nameFurniture}</p>
                                            <p className='font-weight-bold' > Price: {furniture.price}$ </p>
                                            <Link to={`/view/furniture/${furniture._id}`} className={'btn btn-outline-primary'}>Ver mas</Link>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                    </motion.div>
                


                ))
            }
        
        </>

    );
    
}

export default CardFurnitures;





