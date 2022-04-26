const Furniture = require('../models/furniture.model');
const formidable = require('formidable');// analiza datos de formularios, especialmente cargas de archivos.
const fs = require('fs');  // --> fyle system --> escoger archivos del sistema
const _ =require('loadsh'); // --> para hacer programacion funcional

const registerfurniture = (req,res) => {
    console.log('se esta registrando un mueble')
    const form = new formidable.IncomingForm(); // Crea un nuevo formulario entrante
    form.keepExtensions = true;           // incluye las extenciones originales de los archivos
    // parse --> analiza la carga de un archivo entrante que contiene datos de formulario
    console.log('0')
    form.parse(req,(err,fields, files)=>{
        console.log('1')
       const {woods} = fields; // los campos del esquema
       console.log(woods)
        const createFurniture = new Furniture(fields);
        if(err){ 
           return res.status(400).json({error: "Imangen no se cargo"});
        }
        if(files.photo){// si el archivo para la foto exite
            if(files.photo.size > 1000000){// si el es mayor a 1 millon de bytes
                return res.status(400).json({error:"el tamano de la foto es mayor a 1 millon de Bytes"});
            } 
            console.log('2')      
            createFurniture.photo.data = fs.readFileSync(files.photo.filepath); // guardar la foto de forma sincronica 
            createFurniture.photo.contentType = files.photo.mimetype; // se guarda la extencion del archivo (png, jpg, etc...)
            const woodsArray = woods.split(',');
            createFurniture.woods = woodsArray;
        }
        console.log('3')

        createFurniture.save()
        .then( furnitureSave => {res.json(furnitureSave); console.log('se creo el mueble')})
        .catch(error => res.status(400).json({msg:"existio un error al crear el mueble", error}));
    });
};

const updateFurniture =(req,res)=>{
    const {id}=req.params;
    const Form =new formidable.IncomingForm();
    Form.keepExtensions = true;
    Form.parse(req,(err,fields,files)=>{
        const {nameFurniture,specifications,woods,category,price} = fields;
        if(err){
            return res.status().json({msg:'there was an error', error: err});
        };
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({msg:"el tamano de la foto es mayor a 1 millon de Bytes", error: err});
            };
           var data = fs.readFileSync(files.photo.filepath);  // tengo que utilizar var
           var contentType = files.photo.mimetype;           //  tengo que utilizar var 
           const woodsArray = woods.split(',');
            woods = woodsArray;
        };
        Furniture.findByIdAndUpdate(id, {nameFurniture,specifications,woods,category,price,height,length,depth,weight, photo:{data, contentType}})
        .then(upfurniture => res.json(upfurniture))
        .catch(error => res.status(400).json({msg:"no se pudo acutalizar",error}));
    });
};


const getAll =(req, res)=>{ 
// parametros de la consulta 
    const order =req.query.order ? req.query.order : 'asc';
    const sortBy = req.query.sortBy ? req.query.sortBy : 'nameFurniture';
    Furniture.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy,order]])
    .then(result => res.json(result))
    .catch(err => res.json({msg:"no funciona", error: err}));
};


// este metodo me eliminar un objeto, sin mostrarme la foto
const oneDelete = (req,res)=>{
    const {id}= req.params;
    Furniture.findByIdAndRemove(id)
    .select('-photo')
    .then(deleted => res.json(deleted))
    .catch(err => res.json(err));
};

// este metodo muestra solo un objeto, sin mostrarme la foto
const getOne = (req,res)=>{
    const {id}= req.params;
    Furniture.findById(id)
    .select('-photo')
    // .populate('category')
    .then(one=> res.json(one))
    .catch(err => res.json(err));
};

// este metodo 
const photofurniture =(req, res, next)=>{
    const {id} = req.params;
    Furniture.findById(id)
    .then(foto =>{
        res.set('Content-Type', foto.photo.contentType);
        res.send(foto.photo.data);
        next();
    })
    .catch(err=> res.json(err));
};


const priceFurniture =(req,res, next)=>{
    const {gte, lte, categoryId}=req.params;
    console.log(categoryId)
    const lowerLimit = parseFloat(gte);
    const upperLimit = parseFloat(lte);
    console.log(gte,'esta es la ceparacion',lte)
    // Furniture.aggregate([{$match:{$and:[{price:{$gte:lowerLimit, $lte:upperLimit}}]}}])
    Furniture.find({$and:[{price:{$gte:lowerLimit, $lte:upperLimit}},{category:categoryId}]})
    .select('-photo')
    .then(furniture => res.json(furniture))
    .catch(err=> {console.log('exite un error',err); next()})
}


const SearchName = (req,res,next) => {

    const {nameProduct}= req.params;
    
    // Furniture.aggregate([{$match:{nameFurniture:{$regex:nameProduct}}}])
    Furniture.find({nameFurniture:{$regex:nameProduct}})
    .select('-photo')
    .then(furniture => res.json(furniture))
    .catch(err=> {console.log('exite un error',err); next()})
}

module.exports ={registerfurniture, getAll, oneDelete, photofurniture, getOne,updateFurniture,priceFurniture, SearchName}

//rafce



