const Auth = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Register = (req, res)=>{
    console.log(req.body)
    const newUser = new Auth(req.body);
    console.log(newUser)
    newUser.save()
    .then(user => res.json(user))
    .catch(error => res.json({msg:"se produjo un error", error}))
};

const Login =(req, res)=>{
    const {password, email}=  req.body;
    Auth.findOne({email})
    .then(user=>{
        console.log('1')
        if (user==null) {
            res.json({msg:"el usuario no existe"});
        } else {
            console.log('2')
            bcrypt.compare(password, user.password)
            .then(validatePassword =>{
                if(validatePassword){
                    if(email === process.env.ADMIN){
                        console.log('3')  
                        const permissions = [process.env.ADMINPERMISSION1];
                        const JWT_AMIN = jwt.sign({_id:user.id, email, permissions}, process.env.JWT_TOKEN);
                        console.log('esta es el token del admin',JWT_AMIN)
                        // hhtpOnly --> para que solo puedad ser accedida desde el cliente
                        // masAge --> el tiempo de expiracion de la cookie
                        res.cookie('adminToken',JWT_AMIN, process.env.JWT_TOKEN,{ maxAge:1000 ,httpOnly:true}).json(JWT_AMIN);
                    }else{
                        const JWT_USER = jwt.sign({_id:user.id, email}, process.env.JWT_TOKEN);
                        console.log('4')
                        // hhtpOnly --> para que solo puedad ser accedida desde el cliente
                        // masAge --> el tiempo de expiracion de la cookie
                       res.cookie('userToken',JWT_USER, process.env.JWT_TOKEN,{ maxAge:1000 ,httpOnly:true}).json(JWT_USER);
                    }
                }else{
                    res.json({message:"invalid login attempt en esto"});
                }
            })
            .catch(error => res.json({error, msg:"there was an error"}));
        }
    })
    .catch(err=> res.status().json({error:err, msg:"existio un error en el login"}))

};

const getAll = (req,res)=>{
    Auth.find()
    .then(users => res.json(users))
    .catch(err => res.json({err}))
}


module.exports = {Register, Login, getAll}








