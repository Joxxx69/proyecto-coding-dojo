import './App.css';
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './pages/Main'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import useAuth, {AuthProvider} from './hooks/useAuth'
import {CookiesProvider} from 'react-cookie'
import CreateCategory from './pages/Category';
import AddFurniture from './pages/AddFurniture';
import FurniturePrice from './pages/FurnituresPrices';
import SearchFurnitures from './pages/SearchFurnitures';
import FurnitureView from './pages/FurnitureView';

function App() {

    return (
      <div className="App">
        <CookiesProvider>
          <AuthProvider>
            <Navbar/>
            <Routes>
              <Route path='/' element={<MainPage/>}/>
              {/* <Route path='/' element={<RequireAuth permission={"MainPage"}><MainPage/></RequireAuth>}/> */}
              <Route path='/login' element={<Signin/>}/>
              <Route path='/register' element={<Signup/>}/>
              <Route path='/registerFurniture' element={<RequireAuth permission={'admin'}> <AddFurniture/> </RequireAuth> }></Route>
              <Route path='/registerCategory' element={<RequireAuth permission={'admin'} > <CreateCategory/> </RequireAuth>}></Route>
              <Route path='/furniture/price/range' element={<FurniturePrice/>}></Route>
              <Route path='/search/furniture' element={<SearchFurnitures/>} />
              <Route path='/view/furniture/:furnitureID' element={<FurnitureView/>} />
              {/* <Route path='/registerFurniture' element={<RequireAuth><FormFurniture/></RequireAuth>}></Route> */}
            </Routes>
          </AuthProvider>
        </CookiesProvider>
      </div>
    );
  }

function RequireAuth({children,permission}) {
  const {isAuthed, hasPermissions} =useAuth();
  const location = useLocation();

  const getAllowedComponent =()=>{
    console.log('estos son los permisos',permission)
    if(hasPermissions(permission)){
      return children;
    }else{
      return (
        <div className='container'>
          <div className='font-weight-bold h1'>access denied</div>
        </div>
      );
    }
  }

  console.log('este es location.pathname', location.pathname)
  return (isAuthed())? (
    getAllowedComponent()
  ) : (
    <Navigate to='/signup' replace state={{path: location.pathname}}></Navigate>
  )

}


// function App() {
//   const [specifications,setSpecifications]=useState({
//     altura:"",
//     largo:"",
//     profundidad:"",
//     peso:""
//   }); 


//   const {altura, largo, profundidad,peso}= specifications;
//   console.log('esto es antes',specifications)
//   useEffect(()=>{
//     axios.get(`http://localhost:8000/api/furnitures`)
//     .then(res => console.log('recivido',res.data))
//     .catch((err) => {console.log(err)});
//   },[]);
  
//   const separador =(e)=>{
//     //setcadena(e.target.value)
//     setSpecifications({...specifications,[e.target.name]: e.target.value})
//   }
//     const Submit=(e)=>{
//       e.preventDefault();
//       petCreate(); 
//     }
  
//     const petCreate = () => {
//       console.log('este es inse',specifications)
//       axios.post(`http://localhost:8000/api/registerfurniture`,{specifications} )
//         .then(() => console.log('se registro'))
//         .catch((err) => {console.log(err)});
//     };
  
//   const array =[
//     {name:"altura" ,value:altura},
//     {name:"largo" ,value:largo},
//     {name:"profundidad" ,value:profundidad},
//     {name:"peso" ,value:peso}]
  
//     return (
//       <div className="App">
//         <Navbar></Navbar>
//         <form onSubmit={Submit}>

//           {
//             array.map((insert, idx)=>(


//             <div key={idx}>
//                 <label key={idx}>{insert.name}</label>
//                 <input type={'text'} value={insert.value} name={insert.name} onChange={separador}></input>
//             </div>
//             ))
//           }
//           <input type={'submit'} value={"enviar"}></input>
//         </form>
//       </div>
//     );
//   }

// function App() {

// //const [cadena,setcadena]=useState("");
// const [woods,setWoods]=useState("");
// console.log('esto es antes',woods)
// const separador =(e)=>{
//   //setcadena(e.target.value)
//   setWoods(e.target.value.split(','))
// }

//   const Submit=(e)=>{
//     e.preventDefault();
//     petCreate(); 
//   }

//   const petCreate = () => {
//     console.log('este es inse',woods)
//     axios.post(`http://localhost:8000/api/registerfurniture`,{woods} )
//       .then(() => console.log('se registro'))
//       .catch((err) => {console.log(err)});
//     setWoods("");
//   };

//   useEffect(()=>{
//     axios.get(`http://localhost:8000/api/furnitures`)
//       .then(res => console.log('recivido',res.data))
//       .catch((err) => {console.log(err)});
//   },[]);


//   return (
//     <div className="App">
//       <form onSubmit={Submit}>
//         <label>woods</label>
//          <input type={'text'} value={woods} onChange={(e)=>separador(e)}></input>
//         <input type={'submit'} value={"enviar"}></input>
//       </form>
//     </div>
//   );
// }

export default App;
