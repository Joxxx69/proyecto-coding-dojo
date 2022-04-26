import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const FormLogin = ({onSubmitProp}) => {
    const [validationEmail, setValidationEmail]=useState(true);
    const [Auth, setAuth] = useState({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const {email, password}= Auth;

    const AuthChange =(e,number)=>{
        setAuth({...Auth,[e.target.name]: e.target.value})
        validationInputs(e.target.name, e.target.value, number);
    }

    const validationInputs = (name, value, number) => {
        switch (name) {
          case "email":
              setErrors({...errors,[name]: value.length < number});
              setValidationEmail(/^[\w-]+(\.[\w-]+)+@[udla]+(\.[edu]+)*(\.[ec]{2,})$/.test(value))
            break;
          case "password":
              setErrors({...errors,[name]: value.length < number});
            break;
        }
      };
    const Submit =(e)=>{
         e.preventDefault();
         if(validationEmail === false ){
             alert('el correo electronico no cumple con lo requerido');
            console.warn('el correo esta mal')
         }else{
            const newUser={email, password};
            console.log(newUser)
            onSubmitProp({email, password});
         }
    }
    const InputsFormArray=[
        {type:'text', value:email, name:'email', label:'Email' ,number:11, error:errors.email, validationEmail},
        {type:'password', value:password, name:'password', label:'Password' ,number:5, error:errors.password}
    ];

    return (
      <form className="sign-box" onSubmit={Submit}>
            <h2 className='mb-3'>Sign in</h2>
        {
            InputsFormArray.map((input, idx)=>(
                <div className="form-group" key={idx}> 
                    <label className="text-muted">{input.label}</label>
                    {input.name === 'email' &&
                        <>
                            <p className='offset-6 d-inline'>Need an accoun?</p>
                            <Link className='ml-2' to={'/register'}>Sign up</Link>
                        </>
                    }
                    <input required type={input.type}  className="form-control p-4" 
                        value={input.value} name={input.name} onChange={(e)=>AuthChange(e,input.number)}
                    />
                    {input.validationEmail===false && <p className='text-danger font-weight-bold'>the email is wrong</p>}
                    {input.error && <p className='text-danger font-weight-bold'>the field must have at least {input.number} characters</p>}
                </div>
            ))
        }
        <div className="mt-5">
          <input className="btn btn-primary col-12 p-2 font-weight-bold"  type={'submit'} value={"Sing Up"}></input>
        </div>
      </form>
    );
  };


  export default FormLogin;