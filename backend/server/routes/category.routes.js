const Controller = require('../controllers/category.controller');


module.exports = function(app) {
    app.post('/api/createCategory', Controller.createCategory);
    app.get('/api/categories', Controller.getCategories);
    app.get('/api/oneCategory/:id', Controller.getOneCategory);
    app.delete('/api/deleteCategory/:id', Controller.deleteCategory);
}