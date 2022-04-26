const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser'); 
const cookieParser = require('cookie-parser');

//config 
require('./server/config/proyect.confg');
require('dotenv').config();

app.use(express.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Routes Setup
require('./server/routes/category.routes')(app);
require('./server/routes/furniture.routes')(app); 
require('./server/routes/auth.routes')(app);  

// listen to port
const port = process.env.PORT ||3000;
app.listen(port, ()=>{
    console.log(`se establecio la conexion con el puerto ${port}`);
});