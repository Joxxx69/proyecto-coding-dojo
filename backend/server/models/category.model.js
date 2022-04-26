const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
    nameCategory:{
        type: String,
        required: [true,'el nombre de la categoria es reuerido'],
        minlength: [3,'la longitud minima de la catogoria es de 3'],
        unique:[true, 'la categoria debe ser unica']
    }
},{timestamps:true});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
