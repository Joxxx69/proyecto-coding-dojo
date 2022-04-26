import React, { useEffect, useState } from "react";
import axios from "axios";
import CardFurnitures from "../components/sliderCards/Card";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import SearchFurnitures from "./SearchFurnitures";

const MainPage = () => {
  const navigate =useNavigate();
  const [listFurniture, setListFurniture] = useState([]);
  const [listCategories, setListCategories]=useState([]);
  // const [loaded, setLoaded]=useState(false);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/furnitures`)
      .then(({ data }) => {
        setListFurniture(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/categories`)
      .then(({ data }) => setListCategories(data))
      .catch((err) =>
        console.log("exitio un error al listar las categorias", err)
      );
  }, []);


  return (
    <div>
      <>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Furnitures</h1>
            <p className="lead font-weight-normal">
              look for your furniture by price range, it is the best option to choose your comfort.
            </p>
            <Link className="btn btn-outline-secondary" to={'/furniture/price/range'}>Search Furnitures</Link>
          </div>
          <div className="product-device box-shadow d-none d-md-block"></div>
          <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>
        <CardFurnitures listFurniture={listFurniture} listCategories={listCategories} ></CardFurnitures>
      
      </>
    </div>
  );
};

export default MainPage;
