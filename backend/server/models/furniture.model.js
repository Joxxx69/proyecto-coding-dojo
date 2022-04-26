const mongoose = require('mongoose');
const {ObjectId} =mongoose.Schema;

const furnitureSchema = new mongoose.Schema({
    nameFurniture:{
        type: String,
        trim: true,  // para que me quite los espacios en blanco al comienzo y al final del texto introducido
        required: true,
        minlength:4,
        maxlength:34
    },
    height:{
        type: Number
    },
    length:{
        type: Number
    },
    depth:{
        type: Number
    },
    weight:{
        type: Number
    },
    woods:[{         // maderas disponibles para hacer el mueble
        type: String,
        trim: true,
        required:true
    }],
    category:{
        type: ObjectId,
        ref: "Category", // es el modelo a usar 
        required:true
    },
    price:{
        required:true,
        type: Number
    },
    photo:{
        data:Buffer,
        contentType: String
    }
},{timestamps:true});


const Furniture = mongoose.model('Furniture',furnitureSchema);

module.exports = Furniture;




  



  