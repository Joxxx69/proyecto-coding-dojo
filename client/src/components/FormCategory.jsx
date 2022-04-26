import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const FormCategory = ({onSubmitProp,listCategory}) => {
    const [nameCategory, setNameCategory] =useState('');
    const [error, setError]=useState(false);
    const [loaded, setLoaded]=useState(false);

    //const {user, token}= isAuthenticated();

    const CategoryChange=(e)=>{
        setNameCategory(e.target.value);
        setError(listCategory.find(category => category.nameCategory === e.target.value))
        setLoaded(e.target.value.length === 0);
    }
    const CategorySubmit =(e)=>{
        e.preventDefault();
        if(error || loaded){
            alert('no se regitro')
        }else{
            onSubmitProp({nameCategory});
        }
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={CategorySubmit}>
                <h2 className='mb-3'>Add New Category</h2>
                <div className="form-group" > 
                    <label className="text-muted">Name Category</label>
                    <input required type={'text'}  className="form-control p-4" 
                        value={nameCategory} name={'nameCategory'} onChange={CategoryChange}
                    />
                </div>
                {error && <p className='text-danger font-weight-bold' >that category already exists</p>}
                {loaded && <p className='text-danger font-weight-bold' >empty field</p>}
                <div className="mt-5 mb-4">
                    <input className="btn btn-primary col-3 p-2 font-weight-bold"  type={'submit'} value={"Create Category"}></input>
                </div>
            </form>
            <Link className="btn btn-success col-3 p-2 font-weight-bold" to={'/'}>Back to Home</Link>
        </div>
      );
}

export default FormCategory;



