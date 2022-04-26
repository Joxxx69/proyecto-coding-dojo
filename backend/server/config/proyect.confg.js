const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log('se establecio la conexion con la base de datos'))
.catch(err=> console.log('no se pudo establecer la conexion con la base de datos', err));











