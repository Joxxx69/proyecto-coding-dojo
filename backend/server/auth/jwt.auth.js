const jwt = require('jsonwebtoken');

const Authenticate = (req, res, next)=>{
    console.log('este es el autenticate')
    console.log(req.cookies.adminToken)
    jwt.verify(req.cookies.adminToken, process.env.JWT_TOKEN, (err,encoded)=>{
        if(err){
            res.status(401).json({verified: false});
        }else{
            req.encodedID = encoded;
            console.log('este es el payload',encoded)
            next();
        }
    });
}


module.exports = Authenticate;






