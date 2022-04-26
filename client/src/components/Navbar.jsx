import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Navbar = () => {
    const {isAuthed, logout} =useAuth();
    console.log('este es el isautehed',isAuthed())

    const handleclick =()=>{
        logout();
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div className="container">
                    <Link className="navbar-brand font-weight-bold text-white " to={'/'}>FURNITURES</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#" />
                            </li>
                            <li>
                                <Link className='btn btn-outline-light' to={'/search/furniture'}>Search</Link>
                            </li>
                        </ul>
                         
                        <ul className="navbar-nav">
                            <li className="nav-item" >

                            </li>
                            <li className="nav-item">
                                <Link className='nav-link text-white' to={'/registerCategory'}>Add Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link  text-white' to={'/registerFurniture'}>Add Furniture</Link>
                            </li>
                            {isAuthed() ===undefined && <li className="nav-item">
                                 <Link className='nav-link  text-white' to={'/login'}>Signin</Link>
                            </li>}
                            <li className="nav-item">
                                {/* {<Link className='nav-link text-white' to={'/login'}>logout</Link>} */}
                                {isAuthed() && <Link className='nav-link' to={'/'} onClick={handleclick}>logout</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;