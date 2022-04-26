const Category = require('../models/category.model');
const handleError=(res)=>{
    return (err)=>{
        res.status(400).json(err);
    }
}

const createCategory = (req,res) => { 
    const {nameCategory} = req.body;
    console.log(nameCategory)
    const category = new Category({nameCategory});
    category.save()
    .then(newCategory => res.json(newCategory))
    .catch(err => res.status(400).json({message:"hubo un error al crear", error: err }));
 }

 const getCategories = (req, res) => { 
     Category.find()
     .then(categories => res.json(categories))
     .catch(err => res.status(400).json({message:"hubo un error en la lista", error: err }))
  }

  const getOneCategory = (req, res) => {
      const {id} = req.params;
      Category.findById(id)
      .then(oneCategory => res.json(oneCategory))
      .catch(err => res.status(400).json({message:"hubo un error en una categoria", error: err }));
  }

  const deleteCategory = (req,res) => {
    const {id} = req.params;
    Category.findByIdAndRemove(id)
    .then(oneCategory => res.json(oneCategory))
    .catch(err => res.status(400).json({message:"hubo un error al eliminar una categoria", error: err }));
  }

 module.exports = {createCategory, getCategories, getOneCategory, deleteCategory}