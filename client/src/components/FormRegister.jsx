import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const FormRegister = ({onSubmitProp, listUsers}) => {
    const [confirmPas, setConfirmPass] = useState(false);
    const [validationEmail, setValidationEmail]=useState(true);
    const [emailUnique, setEmailUnique]=useState(false);
    const [Auth, setAuth] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    const [errors, setErrors] = useState({
        fname: false,
        lname: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    // const [validation, setValidation]=useState({
    //     confirmPas:false,
    //     validationEmail:true,
    //     emailUnique:false
    // });
    

    const {fname, lname, email, password, confirmPassword}= Auth;

    const AuthChange =(e,number)=>{
        setAuth({...Auth,[e.target.name]: e.target.value})
        validationInputs(e.target.name, e.target.value, number);
    }

    const validationInputs = (name, value, number) => {
        switch (name) {
          case "email":
              setErrors({...errors,[name]: value.length < number});
              setValidationEmail(/^[\w-]+(\.[\w-]+)+@[udla]+(\.[edu]+)*(\.[ec]{2,})$/.test(value))
              //listUsers.map(user => console.log(user.email))
            //   setValidation({...validation, [name]:listUsers.find(user=> value === user.email)})
              setEmailUnique(listUsers.find(user=> value === user.email))
            break;
          case "password":
              setErrors({...errors,[name]: value.length < number});
              setConfirmPass(confirmPassword !== value);
            //   setValidation({...validation,[name]:confirmPassword !== value})
            break;
          case "confirmPassword":
              setErrors({...errors,[name]: value.length < number});
              setConfirmPass(password !== value);
            //   setValidation({...validation,[name]:password !== value});
            break;
          default:
            setErrors({...errors,[name]: value.length < number});
            break;
        }
      };
    const Submit =(e)=>{
         e.preventDefault();
         if(confirmPas || validationEmail === false || emailUnique){
             if(confirmPas){
                alert('las contrasenas no coinciden');
             }
             if(validationEmail === false){
                alert('el correo electronico no cumple con lo requerido');
             }
             if(emailUnique){
                alert('el correo electronico ya existe');
             }
            console.error('las contrasenas no coinciden')
            console.warn('el correo esta mal')
            console.error('el correo electronico ya existe')
         }else{
            const newUser={fname, lname, email, password, confirmPassword};
            console.log(newUser)
            onSubmitProp({fname, lname, email, password, confirmPassword});
         }
    }
    const InputsFormArray=[
        {type:'text', value:fname, name:'fname', label:'First Name' ,number:3, error:errors.fname },
        {type:'text', value:lname, name:'lname', label:'Last Name' ,number:3, error:errors.lname },
        {type:'email', value:email, name:'email', label:'Email' ,number:11, error:errors.email, validationEmail, emailUnique, placeholder:"fname.lname@udla.edu.ec" },
        {type:'password', value:password, name:'password', label:'Password' ,number:5, error:errors.password},
        {type:'password', value:confirmPassword, name:'confirmPassword', label:'Confirm Password' , number:5, error:errors.confirmPassword, confirmPas}
    ];

    return (
      <form className="sign-box" onSubmit={Submit}>
        <h2 className='mb-3'>Sign up</h2>
        {
            InputsFormArray.map((input, idx)=>(
                <div className="form-group" key={idx}>
                    <label className="text-muted">{input.label}</label>
                    {input.name === 'fname' &&
                        <>
                            <p className='offset-3 d-inline'>Already have an account?</p>
                            <Link className='ml-4' to={'/login'}>Sign in</Link>
                        </>
                    }
                    <input required type={input.type} 
                        className="form-control p-4" placeholder={input.placeholder}
                        value={input.value} name={input.name} 
                        onChange={(e)=>AuthChange(e,input.number)}
                    />
                    {input.emailUnique && <p className='text-danger font-weight-bold' >this email already exists</p>}
                    {input.validationEmail===false && <p className='text-danger font-weight-bold'>the email is wrong</p>}
                    {input.error && <p className='text-danger font-weight-bold'>the field must have at least {input.number} characters</p>}
                    {input.confirmPas && <p className='text-danger font-weight-bold' >passwords do not match</p>}
                </div>
            ))
        }
        <div className="mt-5">
          <input className="btn btn-primary col-12 p-2 font-weight-bold"  type={'submit'} value={"Sing Up"}></input>
        </div>
      </form>
    );
  };


  export default FormRegister;